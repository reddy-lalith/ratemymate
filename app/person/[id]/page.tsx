"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Star, GraduationCap, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import Link from "next/link"
import { getPerson, getPersonReviews, Person, Review } from "@/lib/database"

export default function PersonProfilePage() {
  const params = useParams()
  const router = useRouter()
  const personId = params.id as string

  const [person, setPerson] = useState<Person | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPersonData = async () => {
      if (!personId) return

      setLoading(true)
      try {
        const [personData, reviewsData] = await Promise.all([
          getPerson(personId),
          getPersonReviews(personId)
        ])

        setPerson(personData)
        setReviews(reviewsData)
      } catch (error) {
        console.error("Error loading person data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPersonData()
  }, [personId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-rose-500 mx-auto mb-4"></div>
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-rose-400 animate-subtle-pulse" />
          </div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-rose-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Person Not Found</h2>
          <p className="text-gray-600 mb-4">The person you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="bg-rose-600 hover:bg-rose-700 text-white">
            Back to Search
          </Button>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalReviews = reviews.length
  const wouldDateAgain = reviews.filter(review => review.would_date_again).length
  const dateAgainPercentage = totalReviews > 0 ? Math.round((wouldDateAgain / totalReviews) * 100) : 0
  const averageRating = totalReviews > 0 
    ? Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews * 10) / 10
    : 0

  // Get all tags
  const allTags = reviews.flatMap(review => review.tags || [])
  const tagCounts: Record<string, number> = {}
  allTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1
  })

  const topTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag)

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
        </div>

        {/* Person Profile Card */}
        <Card className="mb-8 bg-white border-rose-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {person.first_name} {person.last_name}
                </CardTitle>
                <div className="flex items-center text-gray-600 mt-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{person.college}</span>
                </div>
              </div>
              <Button 
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={() => router.push(`/review/new?firstName=${person.first_name}&lastName=${person.last_name}&college=${person.college}`)}
              >
                Write Review
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Rating Stats */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>

              {/* Would Date Again */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {dateAgainPercentage >= 60 ? (
                    <ThumbsUp className="w-6 h-6 text-green-600" />
                  ) : dateAgainPercentage >= 40 ? (
                    <Minus className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <ThumbsDown className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{dateAgainPercentage}%</p>
                <p className="text-sm text-gray-600">Would Date Again</p>
              </div>

              {/* Total Reviews */}
              <div className="text-center">
                <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>

            {/* Top Tags */}
            {topTags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {topTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-sm bg-rose-50 text-rose-700 border-rose-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <Button 
              variant="outline"
              onClick={() => router.push(`/review/new?firstName=${person.first_name}&lastName=${person.last_name}&college=${person.college}`)}
            >
              Write Review
            </Button>
          </div>

          {reviews.length === 0 ? (
            <Card className="border-dashed border-2 border-rose-200 bg-white/70">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Be the first to share your experience with {person.first_name}</p>
                <Button 
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={() => router.push(`/review/new?firstName=${person.first_name}&lastName=${person.last_name}&college=${person.college}`)}
                >
                  Write First Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-white border-rose-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          {review.would_date_again ? (
                            <span className="text-green-600 flex items-center">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Would date again
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center">
                              <ThumbsDown className="w-3 h-3 mr-1" />
                              Would not date again
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {review.tags && review.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {review.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-gray-50 text-gray-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-700 whitespace-pre-wrap">{review.review_text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
