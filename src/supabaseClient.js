
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        'Supabase keys are missing! Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    )
}

// Export a real client if keys exist, otherwise a safe mock to prevent crash
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            upsert: () => Promise.resolve({ error: null }),
            gt: () => Promise.resolve({ data: [], error: null })
        })
    }

