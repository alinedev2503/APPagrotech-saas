import { useState } from 'react';
import { Mic, QrCode, Syringe, Calendar, AlertCircle, CheckCircle2, Bell, BellRing, X, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useVoiceInput } from '../hooks/useVoiceInput';
import MiniCalendar from '../components/MiniCalendar';

export default function Sanitary() {
  const { isListening, processing, result: voiceResult, startListening } = useVoiceInput();
  
  // Reminder State
  const [reminderModal, setReminderModal] = useState<{isOpen: boolean, itemId: number | null}>({isOpen: false, itemId: null});
  const [reminders, setReminders] = useState<Record<number, string>>({}); // itemId -> reminder setting
  const [selectedReminderOption, setSelectedReminderOption] = useState<string>('1 dia antes');

  // Mock Data for Charts
  const vaccinationData = [
    { name: 'Vacinados', value: 850, color: '#22c55e' }, // green-500
    { name: 'Pendentes', value: 150, color: '#ef4444' }, // red-500
  ];

  const diseaseData = [
    { name: 'Mastite', cases: 12 },
    { name: 'Pneumonia', cases: 8 },
    { name: 'Casco', cases: 5 },
    { name: 'Carrapato', cases: 25 },
  ];

  // Mock Data for Vaccinations (aligned with current date context: March 2026)
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const upcomingVaccinations = [
    { 
      id: 1, 
      type: 'Brucelose', 
      target: 'Fêmeas 3-8m', 
      date: new Date(today), // Today
      displayDate: 'Hoje',
      status: 'urgent' as const 
    },
    { 
      id: 2, 
      type: 'Aftosa', 
      target: 'Todo Rebanho', 
      date: new Date(currentYear, 2, 15), // March 15
      displayDate: '15 Mar',
      status: 'pending' as const 
    },
    { 
      id: 3, 
      type: 'Clostridiose', 
      target: 'Bezerros', 
      date: new Date(currentYear, 2, 20), // March 20
      displayDate: '20 Mar',
      status: 'pending' as const 
    },
  ];

  const toggleReminder = (id: number) => {
    if (reminders[id]) {
      const newReminders = { ...reminders };
      delete newReminders[id];
      setReminders(newReminders);
    } else {
      setReminderModal({ isOpen: true, itemId: id });
    }
  };

  const saveReminder = () => {
    if (reminderModal.itemId !== null) {
      setReminders({
        ...reminders,
        [reminderModal.itemId]: selectedReminderOption
      });
      setReminderModal({ isOpen: false, itemId: null });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Manejo Sanitário</h2>
          <p className="text-stone-500 dark:text-stone-400">Controle de vacinas, carência e tratamentos.</p>
        </div>
        <button 
          onClick={() => startListening('Sanitário')}
          className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          <Mic size={28} />
          {isListening ? 'Ouvindo...' : 'Comando de Voz'}
        </button>
      </header>

      {/* Processing Feedback */}
      {processing && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-center gap-3 animate-pulse">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-800 font-medium">Processando comando com IA...</p>
        </div>
      )}

      {/* Last Entry Result */}
      {voiceResult && !processing && (
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="text-green-600" />
            <h3 className="font-bold text-green-900">Registro Processado</h3>
          </div>
          <pre className="text-sm text-green-800 overflow-x-auto bg-green-100/50 p-2 rounded">
            {voiceResult}
          </pre>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-6 bg-white border-2 border-stone-200 rounded-2xl flex flex-col items-center gap-3 hover:border-orange-500 hover:bg-orange-50 transition-all">
          <QrCode size={40} className="text-stone-600" />
          <span className="font-bold text-stone-700">Ler Brinco</span>
        </button>
        <button className="p-6 bg-white border-2 border-stone-200 rounded-2xl flex flex-col items-center gap-3 hover:border-orange-500 hover:bg-orange-50 transition-all">
          <Syringe size={40} className="text-stone-600" />
          <span className="font-bold text-stone-700">Nova Vacina</span>
        </button>
        <button className="p-6 bg-white border-2 border-stone-200 rounded-2xl flex flex-col items-center gap-3 hover:border-orange-500 hover:bg-orange-50 transition-all">
          <Calendar size={40} className="text-stone-600" />
          <span className="font-bold text-stone-700">Calendário</span>
        </button>
        <button className="p-6 bg-white border-2 border-stone-200 rounded-2xl flex flex-col items-center gap-3 hover:border-orange-500 hover:bg-orange-50 transition-all">
          <AlertCircle size={40} className="text-stone-600" />
          <span className="font-bold text-stone-700">Carência</span>
        </button>
      </div>

      {/* Health Metrics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vaccination Rate */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <h3 className="font-bold text-lg text-stone-800 dark:text-white mb-4">Taxa de Vacinação</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vaccinationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vaccinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {vaccinationData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-stone-600 dark:text-stone-400 font-medium">{item.name} ({Math.round(item.value / 10)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Incidence */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <h3 className="font-bold text-lg text-stone-800 dark:text-white mb-4">Incidência de Doenças (Mês)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseData}>
                <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="cases" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mortality Rate */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-stone-800 dark:text-white mb-2">Taxa de Mortalidade</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm">Acumulado do ano corrente.</p>
          </div>
          
          <div className="flex items-end gap-2 my-6">
            <span className="text-5xl font-bold text-stone-900 dark:text-white">1.2%</span>
            <span className="text-green-500 font-bold mb-2 flex items-center text-sm">
              -0.3% <span className="text-stone-400 font-normal ml-1">vs ano anterior</span>
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-stone-50 dark:bg-stone-800 p-3 rounded-xl flex justify-between items-center">
              <span className="text-sm text-stone-600 dark:text-stone-400">Bezerros</span>
              <span className="font-bold text-stone-900 dark:text-white">0.8%</span>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800 p-3 rounded-xl flex justify-between items-center">
              <span className="text-sm text-stone-600 dark:text-stone-400">Adultos</span>
              <span className="font-bold text-stone-900 dark:text-white">0.4%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Withdrawal Period Control Section */}
      <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden mt-6">
        <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <h3 className="font-bold text-xl text-stone-800 dark:text-white flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            Controle de Carência (Abate/Leite)
          </h3>
          <span className="text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-1 rounded">
            Atualizado: Hoje
          </span>
        </div>
        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {[
            { id: 101, animal: 'Boi 552', medication: 'Ivermectina', date: '2026-02-20', withdrawalDays: 28, type: 'Corte' },
            { id: 102, animal: 'Vaca 103', medication: 'Antibiótico Mastite', date: '2026-02-25', withdrawalDays: 4, type: 'Leite' },
            { id: 103, animal: 'Bezerro 88', medication: 'Vitamina ADE', date: '2026-01-10', withdrawalDays: 0, type: 'Corte' },
            { id: 104, animal: 'Boi 771', medication: 'Carrapaticida', date: '2026-02-10', withdrawalDays: 14, type: 'Corte' },
          ].map((item) => {
            const today = new Date(); // Using system date for demo
            const medDate = new Date(item.date);
            const releaseDate = new Date(medDate);
            releaseDate.setDate(medDate.getDate() + item.withdrawalDays);
            
            const daysLeft = Math.ceil((releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isBlocked = daysLeft > 0;

            return (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/50 gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isBlocked ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {item.animal.split(' ')[1]}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">{item.animal} <span className="text-xs font-normal text-stone-500 dark:text-stone-400">({item.type})</span></h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{item.medication} em {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-stone-400 uppercase font-bold">Status</p>
                    {isBlocked ? (
                      <div className="flex items-center gap-1 text-red-600 font-bold">
                        <AlertCircle size={16} />
                        <span>Bloqueado ({daysLeft} dias)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600 font-bold">
                        <CheckCircle2 size={16} />
                        <span>Liberado</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right hidden sm:block">
                     <p className="text-xs text-stone-400 uppercase font-bold">Liberação</p>
                     <p className="font-medium text-stone-700 dark:text-stone-300">{releaseDate.toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reminder Modal */}
      {reminderModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-stone-200 dark:border-stone-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2">
                <BellRing className="text-orange-600" />
                Configurar Lembrete
              </h3>
              <button 
                onClick={() => setReminderModal({ isOpen: false, itemId: null })}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-stone-600 dark:text-stone-300 mb-4">
              Quando você deseja ser lembrado desta vacinação?
            </p>

            <div className="space-y-2 mb-6">
              {['No dia', '1 dia antes', '3 dias antes', '1 semana antes'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedReminderOption(option)}
                  className={`w-full p-3 rounded-xl text-left font-medium transition-all ${
                    selectedReminderOption === option
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-2 border-orange-500'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-2 border-transparent hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={saveReminder}
              className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold py-3 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Salvar Lembrete
            </button>
          </div>
        </div>
      )}

      {/* Vaccination Status List & Calendar */}
      <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
        <div className="p-6 border-b border-stone-100 dark:border-stone-800">
          <h3 className="font-bold text-xl text-stone-800 dark:text-white">Próximas Vacinações</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* List View */}
          <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-100 dark:border-stone-800 rounded-xl overflow-hidden">
            {upcomingVaccinations.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/50">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.status === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">{item.type}</h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{item.target}</p>
                    {reminders[item.id] && (
                      <div className="flex items-center gap-1 mt-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                        <Clock size={12} />
                        <span>Lembrete: {reminders[item.id]}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`font-bold ${item.status === 'urgent' ? 'text-red-600 dark:text-red-400' : 'text-stone-600 dark:text-stone-400'}`}>
                      {item.displayDate}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleReminder(item.id)}
                    className={`p-2 rounded-full transition-colors ${
                      reminders[item.id] 
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' 
                        : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-200'
                    }`}
                    title={reminders[item.id] ? "Remover lembrete" : "Adicionar lembrete"}
                  >
                    {reminders[item.id] ? <BellRing size={20} /> : <Bell size={20} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar View */}
          <div>
            <MiniCalendar vaccinations={upcomingVaccinations} reminders={reminders} />
          </div>
        </div>
      </section>
    </div>
  );
}
