# Supabase Setup Guide

This guide will help you set up Supabase for the Rate My Mate application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create Database Tables

Run these SQL commands in your Supabase SQL editor:

### People Table
```sql
CREATE TABLE people (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  college TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON people
  FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" ON people
  FOR INSERT WITH CHECK (true);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID REFERENCES people(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  would_date_again BOOLEAN NOT NULL,
  tags TEXT[] DEFAULT '{}',
  review_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON reviews
  FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" ON reviews
  FOR INSERT WITH CHECK (true);
```

## 5. Test Your Setup

1. Start your development server: `npm run dev`
2. Go to your application and try searching for someone
3. Try creating a new review

## 6. Optional: Add Sample Data

You can add some sample data to test with:

```sql
-- Insert sample people
INSERT INTO people (first_name, last_name, college) VALUES
  ('Pushti', 'Laddha', 'UNC Chapel Hill'),
  ('John', 'Doe', 'NYU'),
  ('Sarah', 'Miller', 'Duke University');

-- Insert sample reviews
INSERT INTO reviews (person_id, rating, would_date_again, tags, review_text) VALUES
  ((SELECT id FROM people WHERE first_name = 'Pushti' AND last_name = 'Laddha'), 5, true, ARRAY['Amazing Communicator', 'Incredibly Supportive', 'Loyal'], 'Pushti is absolutely incredible. We dated for over a year at UNC and she was the most caring, supportive partner I''ve ever had.'),
  ((SELECT id FROM people WHERE first_name = 'John' AND last_name = 'Doe'), 4, true, ARRAY['Great Communicator', 'Funny', 'Respectful'], 'John is a great guy with a wonderful sense of humor. We had a lot of fun together.'),
  ((SELECT id FROM people WHERE first_name = 'Sarah' AND last_name = 'Miller'), 5, true, ARRAY['Loyal', 'Supportive', 'Great Communicator'], 'Sarah is incredibly loyal and supportive. She was always there for me when I needed her.');
```

## Troubleshooting

- **Connection errors**: Make sure your environment variables are correct
- **Permission errors**: Check that RLS policies are set up correctly
- **Type errors**: Make sure you've installed the Supabase client: `npm install @supabase/supabase-js` 