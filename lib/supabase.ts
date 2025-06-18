import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Person {
  id: string
  first_name: string
  last_name: string
  college: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  person_id: string
  rating: number
  would_date_again: boolean
  tags: string[]
  review_text: string
  created_at: string
  updated_at: string
}

export interface PersonWithStats {
  id: string
  first_name: string
  last_name: string
  college: string
  date_again_percentage: number
  total_reviews: number
  top_tags: string[]
} 