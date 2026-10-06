export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: string;
  tenantId?: string;
}

export interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  signIn(email: string, password?: string): Promise<User>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
