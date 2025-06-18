"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, GraduationCap, Heart } from "lucide-react"
import Link from "next/link"
import { searchPeople, PersonWithStats } from "@/lib/database"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<PersonWithStats[]>([])
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
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-rose-500 mx-auto mb-4"></div>
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-rose-400 animate-subtle-pulse" />
          </div>
          <p className="text-gray-600">Searching...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-rose-500 animate-subtle-pulse" />
              Rate My Mate
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="text-gray-600 hover:text-rose-600 font-medium">
                Sign In
              </Link>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{firstName} {lastName}" at {college}
          </h1>
          <p className="text-gray-600 mt-2">Found {results.length} people matching your search</p>
        </div>

        <div className="space-y-4">
          {results.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-all bg-white border-rose-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{person.first_name} {person.last_name}</h3>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        <span>{person.college}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mb-3">
                      <div className="flex items-center space-x-2">
                        {person.date_again_percentage >= 60 ? (
                          <div className="flex items-center bg-green-50 rounded-full px-3 py-1 border border-green-200">
                            <ThumbsUp className="w-4 h-4 text-green-600 mr-2" />
                            <span className="font-semibold text-green-700">{person.date_again_percentage}%</span>
                          </div>
                        ) : person.date_again_percentage >= 40 ? (
                          <div className="flex items-center bg-yellow-50 rounded-full px-3 py-1 border border-yellow-200">
                            <Minus className="w-4 h-4 text-yellow-600 mr-2" />
                            <span className="font-semibold text-yellow-700">{person.date_again_percentage}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center bg-red-50 rounded-full px-3 py-1 border border-red-200">
                            <ThumbsDown className="w-4 h-4 text-red-600 mr-2" />
                            <span className="font-semibold text-red-700">{person.date_again_percentage}%</span>
                          </div>
                        )}
                        <span className="text-gray-600">would date again</span>
                      </div>
                      <div className="text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1">
                        {person.total_reviews} review{person.total_reviews !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {person.top_tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="text-xs bg-rose-50 text-rose-700 border-rose-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="ml-6">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white" asChild>
                      <Link href={`/person/${person.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results found option */}
        <Card className="mt-8 border-dashed border-2 border-rose-200 bg-white/70">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Don't see who you're looking for?</h3>
            <p className="text-gray-600 mb-4">Be the first to create a page by writing a review</p>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white" asChild>
              <Link
                href={`/review/new?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&college=${encodeURIComponent(college)}`}
              >
                Write First Review
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
