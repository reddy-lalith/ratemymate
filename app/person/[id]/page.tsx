import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ThumbsUp, Star, Flag, GraduationCap, Heart, Sparkles, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock person data
const personData = {
  name: "Pushti Laddha",
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
            href="/search" 
            className="inline-flex items-center text-slate-600 hover:text-rose-600 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/10 p-8">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">{personData.name.split(" ")[0][0]}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{personData.name}</h1>
                    <div className="flex items-center text-slate-500 text-sm">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{personData.college}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>

                {/* Rating Stats */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-xl px-4 py-2 border border-rose-200/50">
                    <ThumbsUp className="w-5 h-5 text-rose-500" />
                    <span className="text-xl font-bold text-slate-900">{personData.dateAgainPercentage}%</span>
                    <span className="text-slate-600 text-sm font-medium">would date again</span>
                  </div>
                  <div className="text-slate-500 bg-slate-100/50 rounded-xl px-4 py-2 text-sm">
                    {personData.totalReviews} reviews
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {personData.topPositiveTags.slice(0, 4).map((tag) => (
                    <Badge 
                      key={tag} 
                      className="bg-gradient-to-r from-rose-50 to-purple-50 text-slate-700 border-rose-200/50 text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 bg-white border-t border-slate-100">
            <Button className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white rounded-xl">
              <MessageCircle className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>

        {/* Love Language Scorecard */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Love Language Scorecard</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(personData.loveLanguageScores).map(([language, score]) => (
              <div key={language} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-slate-700">{language}</div>
                <div className="flex-1">
                  <Progress 
                    value={score * 20} 
                    className="h-2 bg-slate-100" 
                    style={{
                      '--progress-background': 'linear-gradient(to right, #f43f5e, #a855f7)',
                    } as React.CSSProperties}
                  />
                </div>
                <div className="flex items-center space-x-1 bg-slate-50 rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold text-slate-700">{score.toFixed(1)}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
          </div>

          <div className="space-y-4">
            {personData.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-all">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-xl px-3 py-1.5 border border-rose-200/50">
                    <ThumbsUp className="w-4 h-4 text-rose-500" />
                    <span className="text-sm font-medium text-slate-700">Would date again</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {review.date}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      className="bg-slate-100 text-slate-600 border-slate-200 text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 leading-relaxed mb-4">{review.review}</p>

                {/* Love Language Ratings */}
                <div className="bg-gradient-to-r from-slate-50 to-rose-50/30 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-rose-400" />
                    Love Language Ratings
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.entries(review.loveLanguages).map(([language, score]) => (
                      <div key={language} className="text-center bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                        <div className="font-medium text-slate-700 text-xs">{language.split(" ")[0]}</div>
                        <div className="flex items-center justify-center mt-1">
                          <span className="font-semibold text-slate-600 text-sm">{score}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-current ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50 p-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> All reviews represent personal opinions and experiences. Rate My Mate does
            not verify the accuracy of user-submitted content. Reviews should be considered subjective perspectives,
            not factual statements.
          </p>
        </div>
      </main>
    </div>
  )
}
