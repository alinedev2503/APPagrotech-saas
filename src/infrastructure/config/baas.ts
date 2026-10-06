import { IAuthService } from '../../domain/interfaces/IAuthService';
import { IDatabaseService } from '../../domain/interfaces/IDatabaseService';
import { FirebaseAuthAdapter } from '../adapters/firebase/FirebaseAuthAdapter';
import { SupabaseAuthAdapter } from '../adapters/supabase/SupabaseAuthAdapter';
import { FirebaseDatabaseAdapter } from '../adapters/firebase/FirebaseDatabaseAdapter';
import { SupabaseDatabaseAdapter } from '../adapters/supabase/SupabaseDatabaseAdapter';

// O comprador definirá esta variável no .env: VITE_BAAS_PROVIDER=firebase | supabase
const provider = import.meta.env.VITE_BAAS_PROVIDER || 'firebase';

export const getAuthService = (): IAuthService => {
  if (provider === 'supabase') {
    return new SupabaseAuthAdapter();
  }
  return new FirebaseAuthAdapter();
};

export const getDatabaseService = (): IDatabaseService => {
  if (provider === 'supabase') {
    return new SupabaseDatabaseAdapter();
  }
  return new FirebaseDatabaseAdapter();
};

// Instâncias globais prontas para uso nos Contextos/Hooks
export const authService = getAuthService();
export const databaseService = getDatabaseService();
