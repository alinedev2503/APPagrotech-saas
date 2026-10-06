import { useState } from 'react';
import { Calculator, Sprout, Map, ArrowRight, CloudRain, Thermometer, AlertTriangle, Droplets, Mic, Calendar } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { GoogleGenAI } from "@google/genai";

export default function Crops() {
  const [seedVigor, setSeedVigor] = useState(95);
  const [soilAnalysis, setSoilAnalysis] = useState('');
  const [result, setResult] = useState<{density: string, fertilizer: string} | null>(null);
  
  // Harvest Schedule State
  const [plantingDate, setPlantingDate] = useState('');
  const [thermalSum, setThermalSum] = useState('');
  const [harvestProjection, setHarvestProjection] = useState<string | null>(null);
  const [isCalculatingHarvest, setIsCalculatingHarvest] = useState(false);

  const { isListening, processing, result: voiceResult, startListening } = useVoiceInput();

  const calculatePrecision = () => {
    // Mock calculation logic
    // In real app, this would use complex agronomic formulas or AI
    const density = Math.round(120000 * (seedVigor / 100));
    setResult({
      density: `${density.toLocaleString()} sementes/ha`,
      fertilizer: '350 kg/ha (Fórmula 04-14-08)'
    });
  };

  const calculateHarvestDate = async () => {
    if (!plantingDate || !thermalSum) return;
    setIsCalculatingHarvest(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Com base na data de plantio ${plantingDate} e uma soma térmica acumulada (Graus-Dia) de ${thermalSum}, projete a data exata da colheita. Explique o raciocínio brevemente. Assuma uma cultura padrão como Soja ou Milho se não especificado, mas mencione que depende da cultura. A resposta deve ser em Português e formatada de forma clara.`,
        });
        setHarvestProjection(response.text);
    } catch (error) {
        console.error("Error calculating harvest date", error);
        setHarvestProjection("Erro ao calcular a data de colheita. Verifique sua conexão e tente novamente.");
    } finally {
        setIsCalculatingHarvest(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Agricultura & Plantio</h2>
          <p className="text-stone-500 dark:text-stone-400">Planejamento de safra e calculadora de precisão.</p>
        </div>
        <button 
          onClick={() => startListening('Agricultura')}
          className={`p-4 rounded-full shadow-lg transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:scale-105'
          }`}
        >
          <Mic size={24} />
        </button>
      </header>

      {/* Voice Result Feedback */}
      {(processing || voiceResult) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          {processing ? (
            <p className="text-blue-800 dark:text-blue-300 font-medium animate-pulse">Processando comando de voz...</p>
          ) : (
            <p className="text-blue-800 dark:text-blue-300 font-medium">{voiceResult}</p>
          )}
        </div>
      )}

      {/* Predictive Alerts Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <CloudRain size={24} className="text-white" />
          </div>
          <h3 className="font-bold text-xl">Alertas Preditivos (IA)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Frost Alert */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4">
            <div className="bg-blue-500/20 p-3 rounded-lg text-blue-300">
              <Thermometer size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-blue-100">Risco de Geada</h4>
              <p className="text-sm text-blue-200/80 mb-2">Alta probabilidade em 48h. Estágio atual (Floração) é crítico.</p>
              <span className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Ação: Cobrir viveiros</span>
            </div>
          </div>

          {/* Drought Alert */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4">
            <div className="bg-orange-500/20 p-3 rounded-lg text-orange-300">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-orange-100">Estresse Hídrico</h4>
              <p className="text-sm text-orange-200/80 mb-2">Previsão de 10 dias sem chuva. Umidade do solo caindo.</p>
              <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">Ação: Antecipar irrigação</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Precision Calculator */}
        <section className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-700 dark:text-green-400">
              <Calculator size={24} />
            </div>
            <h3 className="font-bold text-xl text-stone-800 dark:text-white">Calculadora de Insumos</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Vigor da Semente (%)</label>
              <input 
                type="range" 
                min="80" 
                max="100" 
                value={seedVigor} 
                onChange={(e) => setSeedVigor(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mt-1">
                <span>80%</span>
                <span className="font-bold text-orange-600 text-lg">{seedVigor}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Análise de Solo (ID ou Upload)</label>
              <input 
                type="text" 
                placeholder="Ex: Talhão 04 - Amostra B"
                value={soilAnalysis}
                onChange={(e) => setSoilAnalysis(e.target.value)}
                className="w-full p-3 border border-stone-300 dark:border-stone-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
              />
            </div>

            <button 
              onClick={calculatePrecision}
              className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold py-4 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
            >
              Calcular Dosagem Ideal <ArrowRight size={20} />
            </button>

            {result && (
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-top-4">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">Recomendação de Plantio:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-green-700 dark:text-green-400 uppercase font-bold">Densidade</p>
                    <p className="text-lg font-bold text-green-900 dark:text-green-100">{result.density}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-700 dark:text-green-400 uppercase font-bold">Adubação</p>
                    <p className="text-lg font-bold text-green-900 dark:text-green-100">{result.fertilizer}</p>
                  </div>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-3 italic">
                  *Economia estimada: R$ 450,00/ha comparado à média histórica.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Harvest Schedule */}
        <section className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-700 dark:text-orange-400">
                    <Calendar size={24} />
                </div>
                <h3 className="font-bold text-xl text-stone-800 dark:text-white">Cronograma Dinâmico</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Data de Plantio</label>
                    <input
                        type="date"
                        value={plantingDate}
                        onChange={(e) => setPlantingDate(e.target.value)}
                        className="w-full p-3 border border-stone-300 dark:border-stone-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Soma Térmica (Graus-Dia)</label>
                    <input
                        type="number"
                        placeholder="Ex: 1400"
                        value={thermalSum}
                        onChange={(e) => setThermalSum(e.target.value)}
                        className="w-full p-3 border border-stone-300 dark:border-stone-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                </div>

                <button
                    onClick={calculateHarvestDate}
                    disabled={isCalculatingHarvest}
                    className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold py-4 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isCalculatingHarvest ? 'Calculando...' : 'Projetar Colheita'} <ArrowRight size={20} />
                </button>

                {harvestProjection && (
                    <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800 animate-in fade-in slide-in-from-top-4">
                        <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-2">Projeção de Colheita:</h4>
                        <p className="text-stone-700 dark:text-stone-300 whitespace-pre-line text-sm">{harvestProjection}</p>
                    </div>
                )}
            </div>
        </section>

        {/* Crop Map / Status */}
        <section className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 relative overflow-hidden transition-colors duration-300 lg:col-span-2">
          <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="bg-stone-100 dark:bg-stone-700 p-2 rounded-lg text-orange-600 dark:text-orange-400">
              <Map size={24} />
            </div>
            <h3 className="font-bold text-xl">Mapa de Talhões</h3>
          </div>

          <div className="space-y-4 relative z-10">
            {[
              { id: 'T01', crop: 'Soja', stage: 'R1 - Início Floração', progress: 65, color: 'bg-green-500' },
              { id: 'T02', crop: 'Milho', stage: 'V4 - 4 Folhas', progress: 30, color: 'bg-yellow-500' },
              { id: 'T03', crop: 'Pasto', stage: 'Descanso', progress: 90, color: 'bg-blue-500' },
            ].map((field) => (
              <div key={field.id} className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">
                      {field.id}
                    </span>
                    <span className="ml-2 font-bold text-lg">{field.crop}</span>
                  </div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">{field.progress}% Ciclo</span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 mb-3">{field.stage}</p>
                <div className="w-full bg-stone-200 dark:bg-stone-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${field.color}`} 
                    style={{ width: `${field.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
