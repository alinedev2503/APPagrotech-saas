import { IAuthService, User } from '../../../domain/interfaces/IAuthService';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

if (import.meta.env.VITE_BAAS_PROVIDER === 'supabase' && supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

const mapUser = (supabaseUser: any): User | null => {
  if (!supabaseUser) return null;
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.full_name || undefined,
    avatarUrl: supabaseUser.user_metadata?.avatar_url || undefined,
  };
};

export class SupabaseAuthAdapter implements IAuthService {
  async getCurrentUser(): Promise<User | null> {
    if (!supabase) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return mapUser(session?.user);
  }

  async signIn(email: string, password?: string): Promise<User> {
    if (!supabase) throw new Error('Supabase não inicializado');
    if (!password) throw new Error('Senha obrigatória para Supabase Auth');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return mapUser(data.user)!;
  }

  async signOut(): Promise<void> {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async resetPassword(email: string): Promise<void> {
    if (!supabase) throw new Error('Supabase não inicializado');
    await supabase.auth.resetPasswordForEmail(email);
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    if (!supabase) return () => {};
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(mapUser(session?.user));
    });
    return () => subscription.unsubscribe();
  }
}
