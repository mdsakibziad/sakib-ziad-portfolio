/**
 * Helper to verify whether valid Supabase credentials have been configured.
 * Prevents requests or OAuth redirects to non-existent placeholder domains.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return false
  if (url.includes('placeholder.supabase.co') || url.includes('your-project-id')) return false
  if (key === 'placeholder-anon-key' || key === 'your_supabase_anon_key_here') return false

  return true
}
