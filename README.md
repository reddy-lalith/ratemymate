# Rate My Mate

A modern dating review platform built with Next.js, React, and Tailwind CSS. Rate My Mate allows users to search for potential partners by their first name, last name, and college, then read honest reviews from past partners to make more informed dating decisions.

## Overview

Rate My Mate is a dating review platform designed to help users make more informed decisions about their dating life. The platform features:

- **Smart Search**: Search for people by first name, last name, and college
- **Honest Reviews**: Read anonymous reviews from past partners
- **Rating System**: See percentage of people who would date again
- **Tag System**: View top personality traits and characteristics
- **Modern UI**: Beautiful, responsive design with smooth animations

## Features

- 🔍 **Advanced Search**: Find people using first name, last name, and college
- ⭐ **Review System**: Read and write honest, anonymous reviews
- 📊 **Rating Metrics**: See "would date again" percentages
- 🏷️ **Personality Tags**: View top characteristics and traits
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── review/            # Review functionality
│   ├── search/            # Search results page
│   ├── person/            # Individual person profiles
│   └── page.tsx           # Homepage with search form
├── components/            # Reusable UI components
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## Deployment

The project is currently deployed on Vercel at:

**[https://vercel.com/lalith-reddys-projects/v0-review-platform-design](https://vercel.com/lalith-reddys-projects/v0-review-platform-design)**

## How It Works

1. **Search**: Users enter a person's first name, last name, and college
2. **Results**: View matching profiles with ratings and review counts
3. **Reviews**: Read detailed, anonymous reviews from past partners
4. **Decide**: Make informed decisions based on honest feedback

## Contributing

This is a personal project. Feel free to submit issues or pull requests for improvements.