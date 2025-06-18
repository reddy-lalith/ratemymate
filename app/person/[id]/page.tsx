import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ThumbsUp, Star, Flag, GraduationCap, Heart } from "lucide-react"
import Link from "next/link"

// Mock person data
const personData = {
  name: "Pushti L.",
  college: "UNC Chapel Hill",
  dateAgainPercentage: 100,
  totalReviews: 8,
  loveLanguageScores: {
    "Acts of Service": 5.0,
    "Words of Affirmation": 4.9,
    "Receiving Gifts": 4.8,
    "Quality Time": 5.0,
    "Physical Touch": 4.9,
  },
  topPositiveTags: ["Amazing Communicator", "Incredibly Supportive", "Loyal", "Funny", "Thoughtful", "Generous"],
  topNegativeTags: [],
  reviews: [
    {
      id: 1,
      dateAgain: "yes",
      tags: ["Amazing Communicator", "Incredibly Supportive", "Loyal"],
      loveLanguages: {
        "Acts of Service": 5,
        "Words of Affirmation": 5,
        "Receiving Gifts": 5,
        "Quality Time": 5,
        "Physical Touch": 5,
      },
      review:
        "Pushti is absolutely incredible. We dated for over a year at UNC and she was the most caring, supportive partner I've ever had. She always knew exactly what to say when I was stressed about exams, and she went out of her way to help me with everything. Her communication skills are unmatched - we never had a single unresolved argument because she's so good at talking through issues. I honestly can't think of a single negative thing to say. She's perfect.",
      date: "1 month ago",
    },
    {
      id: 2,
      dateAgain: "yes",
      tags: ["Funny", "Thoughtful", "Generous"],
      loveLanguages: {
        "Acts of Service": 5,
        "Words of Affirmation": 5,
        "Receiving Gifts": 5,
        "Quality Time": 5,
        "Physical Touch": 5,
      },
      review:
        "Dating Pushti was like winning the lottery. She has this amazing sense of humor that could make me laugh even on my worst days. She remembered every little detail about things I cared about and would surprise me with the most thoughtful gestures. Whether it was bringing me my favorite coffee during finals week or planning the perfect date nights around Chapel Hill, she always went above and beyond. 11/10 would date again in a heartbeat.",
      date: "3 months ago",
    },
    {
      id: 3,
      dateAgain: "yes",
      tags: ["Amazing Communicator", "Loyal", "Supportive"],
      loveLanguages: {
        "Acts of Service": 5,
        "Words of Affirmation": 4,
        "Receiving Gifts": 4,
        "Quality Time": 5,
        "Physical Touch": 5,
      },
      review:
        "Pushti set the bar impossibly high for everyone else. She was completely loyal, never gave me any reason to doubt her commitment, and was my biggest cheerleader through everything. When I was going through a tough time with family issues, she was there for me every single day. She's the kind of person who makes you want to be a better version of yourself. I was honestly devastated when we had to break up due to long distance after graduation.",
      date: "6 months ago",
    },
    {
      id: 4,
      dateAgain: "yes",
      tags: ["Thoughtful", "Funny", "Generous"],
      loveLanguages: {
        "Acts of Service": 5,
        "Words of Affirmation": 5,
        "Receiving Gifts": 5,
        "Quality Time": 5,
        "Physical Touch": 4,
      },
      review:
        "I've never met anyone like Pushti. She has this rare combination of being incredibly fun and spontaneous while also being the most reliable person you'll ever meet. She planned the most amazing surprise birthday party for me, remembered every inside joke we ever had, and somehow always knew exactly what I needed before I even knew it myself. If you get the chance to date her, consider yourself the luckiest person alive.",
      date: "8 months ago",
    },
  ],
}

export default function PersonProfile() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Subtle floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-rose-100 animate-gentle-float">
          <Heart className="w-5 h-5" />
        </div>
        <div
          className="absolute bottom-40 right-10 text-rose-100 animate-gentle-float"
          style={{ animationDelay: "2s" }}
        >
          <Heart className="w-4 h-4" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-rose-100">
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

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/search" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 bg-white border-rose-100 shadow-lg">
          <div className="bg-gradient-to-r from-rose-50 to-blush-50 h-1"></div>
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-rose-700">{personData.name.split(" ")[0][0]}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                      {personData.name}
                      <Heart className="w-6 h-6 ml-3 text-rose-400 animate-subtle-pulse" />
                    </h1>
                    <div className="flex items-center text-gray-600 mt-1">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{personData.college}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2 bg-green-50 rounded-full px-4 py-2 border border-green-200">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">{personData.dateAgainPercentage}%</span>
                    <span className="text-green-600 font-medium">would date again</span>
                  </div>
                  <div className="text-gray-500 bg-gray-50 rounded-full px-4 py-2">
                    Based on {personData.totalReviews} reviews
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {personData.topPositiveTags.map((tag) => (
                      <Badge key={tag} className="bg-green-50 text-green-700 border-green-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="bg-rose-600 hover:bg-rose-700 text-white" asChild>
                    <Link href="/review/new">Add Review</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Love Language Scorecard */}
        <Card className="mb-8 bg-white border-rose-100 shadow-lg">
          <CardHeader className="bg-rose-50/50">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Heart className="w-5 h-5 mr-3 text-rose-500" />
              Love Language Scorecard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Object.entries(personData.loveLanguageScores).map(([language, score]) => (
                <div key={language} className="flex items-center space-x-4">
                  <div className="w-40 text-sm font-medium text-gray-700">{language}</div>
                  <div className="flex-1">
                    <Progress value={score * 20} className="h-2" />
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-50 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-700">{score.toFixed(1)}</span>
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            Reviews
            <Heart className="w-5 h-5 text-rose-400 ml-3" />
          </h2>

          {personData.reviews.map((review) => (
            <Card key={review.id} className="bg-white border-rose-100 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 bg-green-50 rounded-full px-4 py-2 border border-green-200">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-700">Would date again</span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1">{review.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-rose-50 text-rose-700 border-rose-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                <div className="border-t border-gray-100 pt-4 bg-gray-50/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-rose-400" />
                    Love Language Ratings
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    {Object.entries(review.loveLanguages).map(([language, score]) => (
                      <div key={language} className="text-center bg-white rounded-lg p-2 border border-gray-100">
                        <div className="font-medium text-gray-700">{language.split(" ")[0]}</div>
                        <div className="flex items-center justify-center">
                          <span className="font-semibold text-gray-600">{score}</span>
                          <Star className="w-3 h-3 text-yellow-500 fill-current ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> All reviews represent personal opinions and experiences. Rate My Mate does
              not verify the accuracy of user-submitted content. Reviews should be considered subjective perspectives,
              not factual statements.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
