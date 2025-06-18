import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ThumbsUp, Star, Flag, GraduationCap, Heart, Sparkles, Calendar, MessageCircle } from "lucide-react"
import Link from "next/link"

// Mock database of people
const peopleDatabase = {
  "pushti-laddha-unc": {
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
          "pushti is quite cool. she may come across as hella weird, but shes chill i guess ",
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
          "if ur dating pushti, goodluck!",
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
          "she lowkey bites, be weary",
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
          "vegetarian, thats all i need to say",
        date: "8 months ago",
      },
    ],
  },
  "kunal-kumar-unc": {
    name: "Kunal Kumar",
    college: "UNC Chapel Hill",
    dateAgainPercentage: 80,
    totalReviews: 5,
    loveLanguageScores: {
      "Acts of Service": 4.2,
      "Words of Affirmation": 4.6,
      "Receiving Gifts": 3.4,
      "Quality Time": 4.6,
      "Physical Touch": 4.0,
    },
    topPositiveTags: ["Ambitious", "Great Communicator", "Thoughtful", "Reliable", "Supportive", "Funny"],
    topNegativeTags: ["Sometimes Busy"],
    reviews: [
      {
        id: 1,
        dateAgain: "yes",
        tags: ["Ambitious", "Great Communicator", "Thoughtful"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 5,
          "Receiving Gifts": 3,
          "Quality Time": 5,
          "Physical Touch": 4,
        },
        review:
          "he just loves IOT so much, i couldnt handle it. literally spent 2 hours explaining how his smart fridge could order groceries and i was like 'dude i just want to eat'. but he did make me a really nice dinner after so thats cool",
        date: "2 weeks ago",
      },
      {
        id: 2,
        dateAgain: "yes",
        tags: ["Reliable", "Supportive", "Funny"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 5,
          "Receiving Gifts": 4,
          "Quality Time": 5,
          "Physical Touch": 4,
        },
        review:
          "7 feet tall, and 7 inches to his dong. but fr tho he's actually really reliable and always shows up when he says he will. also he's like 6'2 which is nice. has a great sense of humor and always makes me laugh",
        date: "1 month ago",
      },
      {
        id: 3,
        dateAgain: "yes",
        tags: ["Ambitious", "Sometimes Busy", "Great Communicator"],
        loveLanguages: {
          "Acts of Service": 5,
          "Words of Affirmation": 4,
          "Receiving Gifts": 3,
          "Quality Time": 4,
          "Physical Touch": 4,
        },
        review:
          "he loves to play with his friend anish way too much, i think hes gay. they literally spent 3 hours playing chess and talking about 'algorithms' while i just sat there. but he did apologize and took me to a nice restaurant after so i guess hes not that bad",
        date: "2 months ago",
      },
      {
        id: 4,
        dateAgain: "yes",
        tags: ["Thoughtful", "Reliable", "Supportive"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 5,
          "Receiving Gifts": 4,
          "Quality Time": 5,
          "Physical Touch": 4,
        },
        review:
          "number 1 rage baiter lowkey, called me fat. but then he immediately felt bad and bought me ice cream and apologized for like 20 minutes straight. he's actually really thoughtful when he's not being a troll. remembers everything i tell him",
        date: "3 months ago",
      },
      {
        id: 5,
        dateAgain: "no",
        tags: ["Sometimes Busy", "Ambitious"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 4,
          "Receiving Gifts": 3,
          "Quality Time": 4,
          "Physical Touch": 4,
        },
        review:
          "somehow knows every food spot in cary north carolina. like literally every single restaurant. but he was too busy with his 'side hustle' which was just him trying to sell his old textbooks on facebook marketplace. waste of time",
        date: "4 months ago",
      },
    ],
  },
  "neel-joshi-unc": {
    name: "Neel Joshi",
    college: "UNC Chapel Hill",
    dateAgainPercentage: 35,
    totalReviews: 6,
    loveLanguageScores: {
      "Acts of Service": 3.2,
      "Words of Affirmation": 3.8,
      "Receiving Gifts": 2.8,
      "Quality Time": 3.5,
      "Physical Touch": 3.0,
    },
    topPositiveTags: ["Charming", "Intelligent", "Adventurous", "Funny", "Thoughtful", "Confident"],
    topNegativeTags: ["Sometimes Overconfident", "Selfish", "Poor Communicator"],
    reviews: [
      {
        id: 1,
        dateAgain: "yes",
        tags: ["Charming", "Intelligent", "Adventurous"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 5,
          "Receiving Gifts": 3,
          "Quality Time": 4,
          "Physical Touch": 4,
        },
        review:
          "he was actually pretty cool ngl. took me to this weird underground restaurant and kept talking about his 'startup' but it was just a tiktok account. still had fun tho",
        date: "1 week ago",
      },
      {
        id: 2,
        dateAgain: "no",
        tags: ["Sometimes Overconfident", "Selfish", "Poor Communicator"],
        loveLanguages: {
          "Acts of Service": 2,
          "Words of Affirmation": 3,
          "Receiving Gifts": 2,
          "Quality Time": 3,
          "Physical Touch": 2,
        },
        review:
          "he always slobbered when he talked and his breath smelled like he ate a whole garlic farm. also kept calling me 'babe' after the first date which was weird af",
        date: "3 weeks ago",
      },
      {
        id: 3,
        dateAgain: "no",
        tags: ["Adventurous", "Sometimes Overconfident", "Selfish"],
        loveLanguages: {
          "Acts of Service": 3,
          "Words of Affirmation": 4,
          "Receiving Gifts": 3,
          "Quality Time": 4,
          "Physical Touch": 3,
        },
        review:
          "dude wore the same socks for 3 days straight and thought it was normal. also kept bragging about his 'coding skills' but couldn't even fix his own wifi. embarrassing",
        date: "1 month ago",
      },
      {
        id: 4,
        dateAgain: "no",
        tags: ["Intelligent", "Poor Communicator", "Selfish"],
        loveLanguages: {
          "Acts of Service": 3,
          "Words of Affirmation": 4,
          "Receiving Gifts": 2,
          "Quality Time": 3,
          "Physical Touch": 3,
        },
        review:
          "he had this weird habit of sniffing his armpits in public and then looking around like he was proud of it. also kept talking about his 'investment portfolio' but lived in a dorm room",
        date: "2 months ago",
      },
      {
        id: 5,
        dateAgain: "no",
        tags: ["Charming", "Sometimes Overconfident", "Poor Communicator"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 3,
          "Receiving Gifts": 3,
          "Quality Time": 3,
          "Physical Touch": 3,
        },
        review:
          "bro literally brought a calculator to dinner to split the bill and then argued about 47 cents. also kept checking his reflection in every window we passed. narcissist much?",
        date: "3 months ago",
      },
      {
        id: 6,
        dateAgain: "no",
        tags: ["Sometimes Overconfident", "Selfish", "Adventurous"],
        loveLanguages: {
          "Acts of Service": 2,
          "Words of Affirmation": 3,
          "Receiving Gifts": 3,
          "Quality Time": 3,
          "Physical Touch": 2,
        },
        review:
          "he smelled like he bathed in axe body spray and then rolled in a gym bag. also kept trying to show me his 'abs' but he just looked like he was having a seizure. cringe af",
        date: "4 months ago",
      },
    ],
  },
  "kishan-gajera-unc": {
    name: "Kishan Gajera",
    college: "UNC Chapel Hill",
    dateAgainPercentage: 69,
    totalReviews: 4,
    loveLanguageScores: {
      "Acts of Service": 3.8,
      "Words of Affirmation": 3.4,
      "Receiving Gifts": 2.9,
      "Quality Time": 3.6,
      "Physical Touch": 3.2,
    },
    topPositiveTags: ["CS Major", "Day Trader", "Honey Bread Lover", "Whiskey Drinker", "Ambitious", "Tech Savvy"],
    topNegativeTags: ["Failed Trader", "Broke", "Weird Food Habits"],
    reviews: [
      {
        id: 1,
        dateAgain: "yes",
        tags: ["CS Major", "Tech Savvy", "Ambitious"],
        loveLanguages: {
          "Acts of Service": 4,
          "Words of Affirmation": 4,
          "Receiving Gifts": 3,
          "Quality Time": 4,
          "Physical Touch": 3,
        },
        review:
          "he's actually pretty smart with computers and stuff. showed me how to code a simple game which was cool. but then he spent the whole night talking about his 'trading strategy' while eating honey with bread straight from the jar",
        date: "1 week ago",
      },
      {
        id: 2,
        dateAgain: "no",
        tags: ["Failed Trader", "Broke", "Whiskey Drinker"],
        loveLanguages: {
          "Acts of Service": 3,
          "Words of Affirmation": 2,
          "Receiving Gifts": 2,
          "Quality Time": 3,
          "Physical Touch": 3,
        },
        review:
          "bro lost his entire funded account and now he's broke af. still drinks magan whiskey like he's rich tho. kept crying about his 'losses' while eating honey with bread. like dude, maybe stop trading and get a real job",
        date: "2 weeks ago",
      },
      {
        id: 3,
        dateAgain: "no",
        tags: ["Weird Habits", "CS Major", "Tech Savvy"],
        loveLanguages: {
          "Acts of Service": 3,
          "Words of Affirmation": 2,
          "Receiving Gifts": 2,
          "Quality Time": 3,
          "Physical Touch": 2,
        },
        review:
          "he's a CS major but somehow can't figure out that day trading is just gambling. lost all his money and now he's asking me to lend him cash for 'one more trade'. like bro, you made 0 money this year, maybe stop",
        date: "1 month ago",
      },
      {
        id: 4,
        dateAgain: "no",
        tags: ["Weird Habits", "Protein Obsessed", "Bad Smell"],
        loveLanguages: {
          "Acts of Service": 3,
          "Words of Affirmation": 3,
          "Receiving Gifts": 2,
          "Quality Time": 3,
          "Physical Touch": 2,
        },
        review:
          "dude drinks way too much premier protein that he smells like a protein fart. like literally every day he has like 5 protein shakes and his room smells like a gym locker. it's disgusting",
        date: "2 months ago",
      },
    ],
  },
}

export default function PersonProfile({ params }: { params: { id: string } }) {
  const personData = peopleDatabase[params.id as keyof typeof peopleDatabase]

  if (!personData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Person Not Found</h1>
          <p className="text-slate-600 mb-6">The person you're looking for doesn't exist in our database.</p>
          <Link href="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
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
