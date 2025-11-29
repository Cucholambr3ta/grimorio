import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Access environment variables
// Note: In Expo, we use process.env.EXPO_PUBLIC_... for variables to be available in the client
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase keys are missing! Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
