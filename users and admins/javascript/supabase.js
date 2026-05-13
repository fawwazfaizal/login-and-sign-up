import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://byqbzulvtleruezgauvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cWJ6dWx2dGxlcnVlemdhdXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzEwNTIsImV4cCI6MjA5NDIwNzA1Mn0.c0tgx042jmswJ3rn6BU6yoYPfikQkghOnIGqvddEkGY'

export const supabase = createClient(supabaseUrl, supabaseKey)
