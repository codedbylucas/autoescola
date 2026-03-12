import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
