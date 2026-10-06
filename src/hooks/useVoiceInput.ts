import { useState, useCallback } from 'react';
import { useOffline } from '../contexts/OfflineContext';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { isOnline, addToSyncQueue } = useOffline();

  const startListening = useCallback(async (context: string = 'general') => {
    setIsListening(true);
    
    // Simulate recording delay
    setTimeout(async () => {
      setIsListening(false);
      setProcessing(true);

      // Mock transcription
      const mockTranscriptions = [
        "Registrar vacina de aftosa em 20 bezerros hoje",
        "Aplicar adubo no talhão 4 amanhã",
        "Vaca 103 com mastite, iniciar tratamento",
        "Plantio de soja finalizado no setor norte"
      ];
      const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      
      if (isOnline) {
        try {
          // Process with Gemini immediately if online
          const model = "gemini-3-flash-preview";
          const prompt = `
            Contexto: ${context}
            Comando: "${randomTranscription}"
            
            Extraia dados estruturados em JSON.
          `;

          const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: { responseMimeType: "application/json" }
          });
          
          const parsed = JSON.parse(response.text || '{}');
          setResult(JSON.stringify(parsed, null, 2));
        } catch (e) {
          console.error("Gemini Error:", e);
          setResult("Erro ao processar online. Salvo para depois.");
          addToSyncQueue({ type: 'voice_command', content: randomTranscription, context });
        }
      } else {
        // Offline mode: Save raw audio/text to queue
        setResult("Sem internet. Comando salvo para processamento na sede.");
        addToSyncQueue({ type: 'voice_command', content: randomTranscription, context });
      }
      
      setProcessing(false);
    }, 2000);
  }, [isOnline, addToSyncQueue]);

  return { isListening, processing, result, startListening };
}
