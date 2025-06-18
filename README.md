# Rate My Mate

A modern dating review platform built with Next.js, React, and Tailwind CSS. Rate My Mate allows users to search for potential partners by their first name, last name, and college, then read honest reviews from past partners to make more informed dating decisions.

## Overview

Rate My Mate is a dating review platform designed to help users make more informed decisions about their dating life. The platform features:

- **Smart Search**: Search for people by first name, last name, and college
- **Honest Reviews**: Read anonymous reviews from past partners
- **Rating System**: See percentage of people who would date again
- **Tag System**: View top personality traits and characteristics
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real Database**: Powered by Supabase for data persistence

## Features

- 🔍 **Advanced Search**: Find people using first name, last name, and college
- ⭐ **Review System**: Read and write honest, anonymous reviews
- 📊 **Rating Metrics**: See "would date again" percentages
- 🏷️ **Personality Tags**: View top characteristics and traits
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations
- 🗄️ **Database Integration**: Real data persistence with Supabase

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase (see [Supabase Setup Guide](./SUPABASE_SETUP.md))
4. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This application uses Supabase as the backend database. Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) to:

1. Create a Supabase project
2. Set up the required database tables
3. Configure Row Level Security policies
4. Add sample data (optional)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── review/            # Review functionality
│   │   └── new/           # New review form
│   ├── search/            # Search results page
│   ├── person/            # Individual person profiles
│   │   └── [id]/          # Dynamic person pages
│   └── page.tsx           # Homepage with search form
├── components/            # Reusable UI components
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client configuration
│   └── database.ts        # Database operations
└── styles/                # Global styles
```

## Database Schema

### People Table
- `id`: UUID (Primary Key)
- `first_name`: TEXT
- `last_name`: TEXT  
- `college`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Reviews Table
- `id`: UUID (Primary Key)
- `person_id`: UUID (Foreign Key to people.id)
- `rating`: INTEGER (1-5)
- `would_date_again`: BOOLEAN
- `tags`: TEXT[]
- `review_text`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## Deployment

The project is currently deployed on Vercel at:

**[https://vercel.com/lalith-reddys-projects/v0-review-platform-design](https://vercel.com/lalith-reddys-projects/v0-review-platform-design)**

## How It Works

1. **Search**: Users enter a person's first name, last name, and college
2. **Results**: View matching profiles with ratings and review counts
3. **Reviews**: Read detailed, anonymous reviews from past partners
4. **Decide**: Make informed decisions based on honest feedback
5. **Contribute**: Write reviews to help others make better decisions

## Contributing

This is a personal project. Feel free to submit issues or pull requests for improvements.

## License

This project is open source and available under the [MIT License](LICENSE).