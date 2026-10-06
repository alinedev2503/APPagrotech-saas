import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Globe, Truck, CloudRain, Sun, Wind, Droplets, AlertTriangle, Newspaper } from 'lucide-react';

export default function MarketIntelligence() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const commodities = [
    { name: 'Boi Gordo', price: 'R$ 235,50', unit: '@', variation: '+1.2%', trend: 'up' },
    { name: 'Soja', price: 'R$ 128,00', unit: 'sc 60kg', variation: '-0.5%', trend: 'down' },
    { name: 'Milho', price: 'R$ 58,90', unit: 'sc 60kg', variation: '+0.1%', trend: 'up' },
    { name: 'Café Arábica', price: 'R$ 1.150,00', unit: 'sc 60kg', variation: '+2.5%', trend: 'up' },
  ];

  const news = [
    { 
      id: 1, 
      source: 'Canal Rural', 
      title: 'Acordo Mercosul-UE avança: o que muda para o agro brasileiro?', 
      tag: 'Geopolítica',
      time: '2h atrás'
    },
    { 
      id: 2, 
      source: 'Notícias Agrícolas', 
      title: 'China retoma compras de carne bovina; mercado reage.', 
      tag: 'Mercado',
      time: '4h atrás'
    },
    { 
      id: 3, 
      source: 'Logística Hoje', 
      title: 'Fila de caminhões em Miritituba chega a 10km; evite a rota.', 
      tag: 'Logística',
      alert: true,
      time: '30min atrás'
    },
  ];

  const weatherAlerts = [
    {
      id: 1,
      type: 'Geada',
      risk: 'Alto',
      message: 'Risco de geada na madrugada de terça-feira. Prepare irrigação.',
      icon: CloudRain, // Using CloudRain as generic weather, ideally Snowflake if available
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'Estresse Hídrico',
      risk: 'Médio',
      message: 'Déficit hídrico acumulado de 15mm. Considere irrigação suplementar.',
      icon: Sun,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Inteligência de Mercado</h2>
        <p className="text-stone-500 dark:text-stone-400">Cotações, notícias e clima para decisões estratégicas.</p>
      </header>

      {/* Commodities Ticker */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {commodities.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-stone-500 dark:text-stone-400 font-medium text-sm">{item.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                item.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {item.variation}
              </span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-stone-900 dark:text-white">{item.price}</span>
              <span className="text-xs text-stone-400 mb-1">/{item.unit}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-stone-800 dark:text-white flex items-center gap-2">
              <Globe className="text-primary" size={20} />
              Radar Geopolítico & Logístico
            </h3>
            <span className="text-xs font-bold text-stone-400 uppercase">Fonte: Canal Rural / Notícias Agrícolas</span>
          </div>
          
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
            {news.map((item) => (
              <div key={item.id} className="p-5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                    item.alert 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                  }`}>
                    {item.tag}
                  </span>
                  <span className="text-xs text-stone-400">{item.time}</span>
                </div>
                <h4 className="font-bold text-lg text-stone-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                  {item.alert && <AlertTriangle className="inline mr-2 text-red-500" size={18} />}
                  {item.title}
                </h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">Fonte: {item.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Climate Intelligence */}
        <section className="space-y-4">
          <h3 className="font-bold text-xl text-stone-800 dark:text-white flex items-center gap-2">
            <CloudRain className="text-blue-500" size={20} />
            Clima Preditivo (IA)
          </h3>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-blue-100 text-sm font-medium">Fazenda Santa Fé</p>
                <h4 className="text-3xl font-bold">28°C</h4>
                <p className="text-blue-100">Parcialmente Nublado</p>
              </div>
              <Sun size={48} className="text-yellow-300 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Wind size={16} className="mx-auto mb-1" />
                <span className="text-xs font-bold">12km/h</span>
              </div>
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Droplets size={16} className="mx-auto mb-1" />
                <span className="text-xs font-bold">65%</span>
              </div>
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <CloudRain size={16} className="mx-auto mb-1" />
                <span className="text-xs font-bold">0mm</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {weatherAlerts.map((alert) => (
              <div key={alert.id} className={`${alert.bg} dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-4 rounded-xl`}>
                <div className="flex items-center gap-2 mb-2">
                  <alert.icon size={18} className={alert.color} />
                  <span className={`font-bold text-sm ${alert.color}`}>{alert.type} • Risco {alert.risk}</span>
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
