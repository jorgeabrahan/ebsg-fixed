import type { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

export class ServiceAuth {
  static async getUser(): Promise<{
    ok: boolean;
    data: User | null;
    error: string | null;
  }> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || user == null) throw error;
      return {
        ok: true,
        data: user,
        error: error,
      };
    } catch (error) {
      const fallbackError = 'Ocurrió un error al obtener el usuario.';
      return {
        ok: false,
        data: null,
        error: (error as AuthError)?.message ?? fallbackError,
      };
    }
  }
  static async signIn(
    email: string,
    password: string,
  ): Promise<{
    ok: boolean;
    data: User | null;
    error: string | null;
  }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return {
        ok: true,
        data: data.user,
        error: null,
      };
    } catch (error) {
      const fallbackError = 'Ocurrió un error al iniciar sesión.';
      return {
        ok: false,
        data: null,
        error: (error as AuthError)?.message ?? fallbackError,
      };
    }
  }
  static async signUp(
    email: string,
    password: string,
    displayName: string,
  ): Promise<{ ok: boolean; data: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });
      if (error) throw error;
      return {
        ok: true,
        data: data.user,
        error: null,
      };
    } catch (error) {
      const fallbackError = 'Ocurrió un error al registrarte.';
      return {
        ok: false,
        data: null,
        error: (error as AuthError)?.message ?? fallbackError,
      };
    }
  }
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return {
        ok: true,
        data: null,
        error: null,
      };
    } catch (error) {
      const fallbackError = 'Ocurrió un error al cerrar sesión.';
      return {
        ok: false,
        data: null,
        error: (error as AuthError)?.message ?? fallbackError,
      };
    }
  }
}
