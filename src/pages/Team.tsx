import { Users, CheckSquare, Clock, Plus } from 'lucide-react';

export default function Team() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Equipe</h2>
          <p className="text-stone-500 dark:text-stone-400">Distribuição de tarefas e produtividade.</p>
        </div>
        <button className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 p-3 rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200">
          <Plus size={24} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team List */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-bold text-stone-700 dark:text-stone-300 uppercase text-sm tracking-wider">Colaboradores</h3>
          {[
            { name: 'João Silva', role: 'Capataz', status: 'online' },
            { name: 'Pedro Santos', role: 'Tratorista', status: 'busy' },
            { name: 'Marcos Oliveira', role: 'Peão', status: 'offline' },
          ].map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700 flex items-center gap-3 cursor-pointer hover:border-orange-500 transition-colors">
              <div className="w-10 h-10 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center font-bold text-stone-600 dark:text-stone-300">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-stone-900 dark:text-white">{member.name}</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">{member.role}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                member.status === 'online' ? 'bg-green-500' : 
                member.status === 'busy' ? 'bg-red-500' : 'bg-stone-300 dark:bg-stone-600'
              }`} />
            </div>
          ))}
        </div>

        {/* Active Tasks */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-stone-700 dark:text-stone-300 uppercase text-sm tracking-wider">Tarefas em Andamento</h3>
          
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                  <CheckSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 dark:text-white">Conserto da Cerca - Pasto 03</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Responsável: João Silva</p>
                </div>
              </div>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">Em Progresso</span>
            </div>
            
            <p className="text-stone-600 dark:text-stone-300 mb-4">
              Substituir 3 mourões quebrados e esticar o arame liso. Verificar aterramento do choque.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Iniciado há 2h</span>
              </div>
              <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium cursor-pointer">
                <span>Ver Fotos (2)</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 opacity-75">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-stone-100 dark:bg-stone-800 p-2 rounded-lg text-stone-600 dark:text-stone-400">
                  <CheckSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 dark:text-white">Suplementação Mineral</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Responsável: Marcos Oliveira</p>
                </div>
              </div>
              <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-3 py-1 rounded-full text-xs font-bold">Pendente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
