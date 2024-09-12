import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/useAuthUser'

const supabaseUrl = 'https://vetivpiipfpyujzejbuy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldGl2cGlpcGZweXVqemVqYnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MTkzMjIsImV4cCI6MjA0MTE5NTMyMn0.E530MKzihPysW-_Ec8dMTMoHAT0I4Zdy5A8J3HPQS9w'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
