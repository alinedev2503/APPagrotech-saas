import { IAuthService, User } from '../../../domain/interfaces/IAuthService';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase only if the config is provided (prevents crash on Supabase mode)
let app;
let auth: any;
if (import.meta.env.VITE_BAAS_PROVIDER === 'firebase' && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
}

const mapUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null;
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || undefined,
    avatarUrl: firebaseUser.photoURL || undefined,
  };
};

export class FirebaseAuthAdapter implements IAuthService {
  async getCurrentUser(): Promise<User | null> {
    if (!auth) return null;
    return mapUser(auth.currentUser);
  }

  async signIn(email: string, password?: string): Promise<User> {
    if (!auth) throw new Error('Firebase não inicializado');
    if (!password) throw new Error('Senha obrigatória para Firebase Auth');
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return mapUser(userCredential.user)!;
  }

  async signOut(): Promise<void> {
    if (!auth) return;
    await firebaseSignOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    if (!auth) throw new Error('Firebase não inicializado');
    await sendPasswordResetEmail(auth, email);
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    if (!auth) return () => {};
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      callback(mapUser(user));
    });
    return unsubscribe;
  }
}
