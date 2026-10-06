import { CloudRain, TrendingUp, AlertTriangle, Droplets, Thermometer, Wind, AlertOctagon } from 'lucide-react';
import { inventoryAlerts } from '../data/inventory';

export default function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const criticalStockItems = inventoryAlerts.filter(item => item.status === 'critical_stock');

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Painel de Controle</h2>
        <p className="text-stone-500 dark:text-stone-400">Fazenda Santa Helena • 27 Fev 2026</p>
      </header>

      {/* Weather Alerts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full text-blue-600 dark:text-blue-400">
              <CloudRain size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">Alerta de Geada</h3>
              <p className="text-blue-800 dark:text-blue-200 mt-1 font-medium">Risco de geada branca em 12h.</p>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">Sugestão: Acionar irrigação de salvamento no Talhão 04.</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-full text-orange-600 dark:text-orange-400">
              <Thermometer size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-orange-900 dark:text-orange-100">Estresse Térmico</h3>
              <p className="text-orange-800 dark:text-orange-200 mt-1 font-medium">Índice THI elevado previsto para 14h.</p>
              <p className="text-sm text-orange-600 dark:text-orange-300 mt-2">Ação: Reforçar hidratação do lote de engorda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Ticker */}
      <section className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-600 dark:text-green-400" />
          <h3 className="font-bold text-lg">Cotações B3 (Tempo Real)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400 text-sm uppercase tracking-wider">Boi Gordo (BGI)</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold">R$ 245,50</span>
              <span className="text-green-600 dark:text-green-400 text-sm font-bold mb-1">▲ 1.2%</span>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400 text-sm uppercase tracking-wider">Soja (SJC)</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold">R$ 128,00</span>
              <span className="text-red-600 dark:text-red-400 text-sm font-bold mb-1">▼ 0.5%</span>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-700">
            <p className="text-stone-500 dark:text-stone-400 text-sm uppercase tracking-wider">Milho (CCM)</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold">R$ 58,90</span>
              <span className="text-stone-500 dark:text-stone-400 text-sm font-bold mb-1">0.0%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions / Alerts */}
      <section>
        <h3 className="font-bold text-xl text-stone-800 dark:text-white mb-4">Ocorrências Urgentes</h3>
        <div className="bg-white dark:bg-stone-900 p-0 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
          
          {/* Critical Stock Alerts */}
          {criticalStockItems.map(item => (
            <div key={item.id} className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                <AlertOctagon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-stone-900 dark:text-white">Estoque Crítico: {item.name}</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Restam apenas {item.quantity} {item.unit}. Consumo médio: {item.avgConsumption}.
                </p>
              </div>
              <button onClick={() => onNavigate('stock')} className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                Repor
              </button>
            </div>
          ))}

          <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-stone-900 dark:text-white">Vacina de Aftosa Vencendo</h4>
              <p className="text-sm text-stone-500 dark:text-stone-400">Lote de 50 doses vence em 3 dias.</p>
            </div>
            <button onClick={() => onNavigate('stock')} className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Ver Estoque</button>
          </div>
          
          <div className="p-4 flex items-center gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-yellow-600 dark:text-yellow-400">
              <Droplets size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-stone-900 dark:text-white">Manutenção Bomba 02</h4>
              <p className="text-sm text-stone-500 dark:text-stone-400">Agendada para hoje às 16:00.</p>
            </div>
            <button className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Detalhes</button>
          </div>
        </div>
      </section>
    </div>
  );
}
