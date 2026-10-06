export interface IDatabaseService {
  get<T>(collection: string, id: string): Promise<T | null>;
  list<T>(collection: string, filters?: any): Promise<T[]>;
  create<T>(collection: string, data: Partial<T>): Promise<T>;
  update<T>(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
  subscribe<T>(collection: string, callback: (data: T[]) => void, filters?: any): () => void;
}
