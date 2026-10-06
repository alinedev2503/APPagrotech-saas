import { AlertTriangle, Sprout, AlertOctagon, Droplets, PackageCheck } from 'lucide-react';

export const inventoryAlerts = [
  { 
    id: 1, 
    name: 'Vacina Aftosa (Lote 882)', 
    type: 'medicine',
    quantity: 40, 
    unit: 'doses',
    daysToExpire: 5, 
    status: 'critical_expiration',
    icon: AlertTriangle,
    avgConsumption: '120 doses/mês',
    lastPurchasePrice: 'R$ 4,50'
  },
  { 
    id: 2, 
    name: 'Semente Milho Híbrido', 
    type: 'seeds',
    quantity: 120, 
    unit: 'sacos',
    daysToExpire: 15, 
    status: 'warning_expiration',
    icon: Sprout,
    avgConsumption: '50 sacos/safra',
    lastPurchasePrice: 'R$ 450,00'
  },
  { 
    id: 3, 
    name: 'Sal Mineral 80kg', 
    type: 'supplement',
    quantity: 2, 
    unit: 'sacos',
    daysToExpire: 180, 
    status: 'critical_stock',
    icon: AlertOctagon,
    avgConsumption: '15 sacos/mês',
    lastPurchasePrice: 'R$ 85,00'
  },
  { 
    id: 4, 
    name: 'Adubo NPK 04-14-08', 
    type: 'fertilizer',
    quantity: 50, 
    unit: 'ton',
    daysToExpire: 365, 
    status: 'ok',
    icon: Droplets,
    avgConsumption: '20 ton/mês',
    lastPurchasePrice: 'R$ 2.800,00'
  },
  { 
    id: 5, 
    name: 'Herbicida Glifosato', 
    type: 'chemical',
    quantity: 5, 
    unit: 'litros',
    daysToExpire: 365, 
    status: 'critical_stock',
    icon: AlertOctagon,
    avgConsumption: '40 litros/mês',
    lastPurchasePrice: 'R$ 45,00'
  },
  { 
    id: 6, 
    name: 'Vacina Raiva', 
    type: 'medicine',
    quantity: 50, 
    unit: 'doses',
    daysToExpire: 2, 
    status: 'critical_expiration',
    icon: AlertTriangle,
    avgConsumption: '80 doses/ano',
    lastPurchasePrice: 'R$ 3,80'
  },
  { 
    id: 7, 
    name: 'Arame Liso', 
    type: 'material',
    quantity: 10, 
    unit: 'rolos',
    daysToExpire: 999, 
    status: 'ok',
    icon: PackageCheck,
    avgConsumption: '2 rolos/mês',
    lastPurchasePrice: 'R$ 650,00'
  }
];
