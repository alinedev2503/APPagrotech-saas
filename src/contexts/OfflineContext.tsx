import React, { createContext, useContext, useState, useEffect } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  syncQueue: any[];
  addToSyncQueue: (item: any) => void;
  lastSync: Date | null;
}

const OfflineContext = createContext<OfflineContextType>({
  isOnline: true,
  syncQueue: [],
  addToSyncQueue: () => {},
  lastSync: null,
});

export const useOffline = () => useContext(OfflineContext);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueue, setSyncQueue] = useState<any[]>(() => {
    const saved = localStorage.getItem('syncQueue');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processSyncQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save queue to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
  }, [syncQueue]);

  const addToSyncQueue = (item: any) => {
    const newItem = { ...item, id: Date.now(), timestamp: new Date().toISOString() };
    setSyncQueue(prev => [...prev, newItem]);
  };

  const processSyncQueue = async () => {
    if (syncQueue.length === 0) return;

    console.log('Processing sync queue...', syncQueue);
    
    // Simulate API calls for each item
    // In a real app, you would iterate and send to backend
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLastSync(new Date());
    setSyncQueue([]); // Clear queue after "success"
    console.log('Sync complete');
  };

  return (
    <OfflineContext.Provider value={{ isOnline, syncQueue, addToSyncQueue, lastSync }}>
      {children}
    </OfflineContext.Provider>
  );
};
