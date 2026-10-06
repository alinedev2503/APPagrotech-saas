import { IDatabaseService } from '../../../domain/interfaces/IDatabaseService';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db: any;
if (import.meta.env.VITE_BAAS_PROVIDER === 'firebase' && firebaseConfig.projectId) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export class FirebaseDatabaseAdapter implements IDatabaseService {
  
  private checkDb() {
    if (!db) throw new Error('Firestore não inicializado');
  }

  async get<T>(collectionName: string, id: string): Promise<T | null> {
    this.checkDb();
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  async list<T>(collectionName: string, filters?: any): Promise<T[]> {
    this.checkDb();
    const colRef = collection(db, collectionName);
    let q = query(colRef);
    
    // Simplification for basic equality filters
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => where(key, '==', value));
      q = query(colRef, ...conditions);
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }

  async create<T>(collectionName: string, data: Partial<T>): Promise<T> {
    this.checkDb();
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, data as any);
    return { id: docRef.id, ...data } as T;
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<T> {
    this.checkDb();
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data as any);
    return { id, ...data } as T;
  }

  async delete(collectionName: string, id: string): Promise<void> {
    this.checkDb();
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }

  subscribe<T>(collectionName: string, callback: (data: T[]) => void, filters?: any): () => void {
    if (!db) return () => {};
    
    const colRef = collection(db, collectionName);
    let q = query(colRef);
    
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => where(key, '==', value));
      q = query(colRef, ...conditions);
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
      callback(items);
    });

    return unsubscribe;
  }
}
