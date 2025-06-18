"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, GraduationCap, Heart, Sparkles, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  name: string
  college: string
  dateAgainPercentage: number
  totalReviews: number
  topTags: string[]
}

// Mock database search function
const searchPeople = async (firstName: string, lastName: string, college: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock database results
  const mockDatabase = [
    {
      id: "pushti-laddha-unc",
      firstName: "Pushti",
      lastName: "Laddha",
      college: "UNC Chapel Hill",
      dateAgainPercentage: 100,
      totalReviews: 8,
      topTags: ["Amazing Communicator", "Incredibly Supportive", "Loyal", "Funny"],
    },
    {
      id: "john-doe-nyu",
      firstName: "John",
      lastName: "Doe",
      college: "NYU",
      dateAgainPercentage: 75,
      totalReviews: 4,
      topTags: ["Great Communicator", "Funny", "Respectful"],
    },
    {
      id: "sarah-miller-duke",
      firstName: "Sarah",
      lastName: "Miller",
      college: "Duke University",
      dateAgainPercentage: 90,
      totalReviews: 6,
      topTags: ["Loyal", "Supportive", "Great Communicator"],
    },
    {
      id: "kunal-kumar-unc",
      firstName: "Kunal",
      lastName: "Kumar",
      college: "UNC Chapel Hill",
      dateAgainPercentage: 80,
      totalReviews: 5,
      topTags: ["Ambitious", "Great Communicator", "Thoughtful", "Reliable"],
    },
    {
      id: "neel-joshi-unc",
      firstName: "Neel",
      lastName: "Joshi",
      college: "UNC Chapel Hill",
      dateAgainPercentage: 35,
      totalReviews: 6,
      topTags: ["Charming", "Intelligent", "Adventurous", "Funny"],
    },
  ]

  // Filter results based on search criteria
  return mockDatabase
    .filter(
      (person) =>
        person.firstName.toLowerCase() === firstName.toLowerCase() &&
        person.lastName.toLowerCase() === lastName.toLowerCase() &&
        person.college.toLowerCase().includes(college.toLowerCase()),
    )
    .map((person) => ({
      id: person.id,
      name: `${person.firstName} ${person.lastName}`,
      college: person.college,
      dateAgainPercentage: person.dateAgainPercentage,
      totalReviews: person.totalReviews,
      topTags: person.topTags,
    }))
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  // Get search parameters once and memoize them
  const firstName = searchParams.get("firstName") || ""
  const lastName = searchParams.get("lastName") || ""
  const college = searchParams.get("college") || ""

  useEffect(() => {
    // Only run search if we have all required parameters
    if (firstName && lastName && college) {
      setLoading(true)
      searchPeople(firstName, lastName, college)
        .then((searchResults) => {
          setResults(searchResults)
        })
        .catch((error) => {
          console.error("Search error:", error)
          setResults([])
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
      setResults([])
    }
  }, [firstName, lastName, college])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-200 border-t-rose-500 mx-auto mb-4"></div>
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
          </div>
          <p className="text-slate-600">Searching...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-slate-900 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-rose-500" />
              Rate My Mate
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="text-slate-600 hover:text-rose-600 text-sm font-medium">
                Sign In
              </Link>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-600 hover:text-rose-600 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>

        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Search Results for "{firstName} {lastName}"
          </h1>
          <div className="flex items-center text-slate-500 text-sm">
            <GraduationCap className="w-4 h-4 mr-2" />
            <span>{college}</span>
            <span className="mx-2">•</span>
            <span>{results.length} people found</span>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-4 mb-8">
          {results.map((person) => (
            <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Person Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-lg font-bold text-white">{person.name.split(" ")[0][0]}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{person.name}</h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        <span>{person.college}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stats */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-3">
                      {person.dateAgainPercentage >= 60 ? (
                        <div className="flex items-center bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-xl px-3 py-1.5 border border-rose-200/50">
                          <ThumbsUp className="w-4 h-4 text-rose-500 mr-2" />
                          <span className="font-semibold text-slate-900">{person.dateAgainPercentage}%</span>
                          <span className="text-slate-600 text-sm ml-1">would date again</span>
                        </div>
                      ) : person.dateAgainPercentage >= 40 ? (
                        <div className="flex items-center bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl px-3 py-1.5 border border-amber-200/50">
                          <Minus className="w-4 h-4 text-amber-500 mr-2" />
                          <span className="font-semibold text-slate-900">{person.dateAgainPercentage}%</span>
                          <span className="text-slate-600 text-sm ml-1">would date again</span>
                        </div>
                      ) : (
                        <div className="flex items-center bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl px-3 py-1.5 border border-red-200/50">
                          <ThumbsDown className="w-4 h-4 text-red-500 mr-2" />
                          <span className="font-semibold text-slate-900">{person.dateAgainPercentage}%</span>
                          <span className="text-slate-600 text-sm ml-1">would date again</span>
                        </div>
                      )}
                    </div>
                    <div className="text-slate-500 bg-slate-100/50 rounded-xl px-3 py-1.5 text-sm">
                      {person.totalReviews} review{person.totalReviews !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {person.topTags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gradient-to-r from-rose-50 to-purple-50 text-slate-700 border-rose-200/50 text-xs font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="ml-6">
                  <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-xl" asChild>
                    <Link href={`/person/${person.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results found option */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Don't see who you're looking for?</h3>
          <p className="text-slate-600 mb-6">Be the first to create a page by writing a review</p>
          <Button className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-xl" asChild>
            <Link
              href={`/review/new?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&college=${encodeURIComponent(college)}`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Write First Review
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
