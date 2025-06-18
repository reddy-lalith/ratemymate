"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Star, GraduationCap } from "lucide-react"
import Link from "next/link"

const positiveTraits = [
  "Loyal",
  "Great Communicator",
  "Generous",
  "Respectful",
  "Funny",
  "Supportive",
  "Ambitious",
  "Thoughtful",
  "Reliable",
]

const negativeTraits = [
  "Selfish",
  "Poor Communicator",
  "Dishonest",
  "Controlling",
  "Ghoster",
  "Disrespectful",
  "Unreliable",
  "Jealous",
  "Inconsiderate",
]

const loveLanguages = ["Acts of Service", "Words of Affirmation", "Receiving Gifts", "Quality Time", "Physical Touch"]

export default function NewReview() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastInitial: "",
    college: "",
    dateAgain: "",
    positiveTags: [] as string[],
    negativeTags: [] as string[],
    loveLanguageRatings: {} as Record<string, number>,
    writtenReview: "",
  })

  // Pre-populate form if coming from search
  useEffect(() => {
    const firstName = searchParams.get("firstName")
    const lastInitial = searchParams.get("lastInitial")
    const college = searchParams.get("college")

    if (firstName || lastInitial || college) {
      setFormData((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastInitial: lastInitial || "",
        college: college || "",
      }))
    }
  }, [searchParams])

  const handleTagToggle = (tag: string, type: "positive" | "negative") => {
    const currentTags = type === "positive" ? formData.positiveTags : formData.negativeTags
    const maxTags = 5

    if (currentTags.includes(tag)) {
      // Remove tag
      const newTags = currentTags.filter((t) => t !== tag)
      setFormData((prev) => ({
        ...prev,
        [type === "positive" ? "positiveTags" : "negativeTags"]: newTags,
      }))
    } else if (currentTags.length < maxTags) {
      // Add tag
      const newTags = [...currentTags, tag]
      setFormData((prev) => ({
        ...prev,
        [type === "positive" ? "positiveTags" : "negativeTags"]: newTags,
      }))
    }
  }

  const handleLoveLanguageRating = (language: string, rating: number) => {
    setFormData((prev) => ({
      ...prev,
      loveLanguageRatings: {
        ...prev.loveLanguageRatings,
        [language]: rating,
      },
    }))
  }

  const renderStars = (language: string, currentRating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleLoveLanguageRating(language, rating)}
            className="focus:outline-none"
          >
            <Star className={`w-6 h-6 ${rating <= currentRating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Rate My Mate
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Write a Review</h1>
          <p className="text-gray-600 mt-2">Share your honest experience to help others make informed decisions</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-teal-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Person Info</span>
            <span>Overall Rating</span>
            <span>Traits & Love Languages</span>
            <span>Written Review</span>
          </div>
        </div>

        <form className="space-y-6">
          {/* Step 1: Person Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Who are you reviewing?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="e.g., John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastInitial">Last Initial</Label>
                  <Input
                    id="lastInitial"
                    value={formData.lastInitial}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastInitial: e.target.value.toUpperCase() }))}
                    placeholder="e.g., D"
                    maxLength={1}
                  />
                </div>
                <div>
                  <Label htmlFor="college" className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    College
                  </Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => setFormData((prev) => ({ ...prev, college: e.target.value }))}
                    placeholder="e.g., NYU, Harvard University"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.firstName || !formData.lastInitial || !formData.college}
                  className="w-full"
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Overall Recommendation */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Would you date this person again?</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.dateAgain}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, dateAgain: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complicated" id="complicated" />
                    <Label htmlFor="complicated">It's Complicated</Label>
                  </div>
                </RadioGroup>
                <div className="flex space-x-4 mt-6">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)} disabled={!formData.dateAgain} className="flex-1">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Traits and Love Languages */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Positive Traits */}
              <Card>
                <CardHeader>
                  <CardTitle>Positive Traits (Select up to 5)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {positiveTraits.map((trait) => (
                      <div key={trait} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pos-${trait}`}
                          checked={formData.positiveTags.includes(trait)}
                          onCheckedChange={() => handleTagToggle(trait, "positive")}
                          disabled={!formData.positiveTags.includes(trait) && formData.positiveTags.length >= 5}
                        />
                        <Label htmlFor={`pos-${trait}`} className="text-sm">
                          {trait}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{formData.positiveTags.length}/5 selected</p>
                </CardContent>
              </Card>

              {/* Negative Traits */}
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement (Select up to 5)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {negativeTraits.map((trait) => (
                      <div key={trait} className="flex items-center space-x-2">
                        <Checkbox
                          id={`neg-${trait}`}
                          checked={formData.negativeTags.includes(trait)}
                          onCheckedChange={() => handleTagToggle(trait, "negative")}
                          disabled={!formData.negativeTags.includes(trait) && formData.negativeTags.length >= 5}
                        />
                        <Label htmlFor={`neg-${trait}`} className="text-sm">
                          {trait}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{formData.negativeTags.length}/5 selected</p>
                </CardContent>
              </Card>

              {/* Love Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Love Language Scorecard</CardTitle>
                  <p className="text-sm text-gray-600">
                    Rate each love language from 1 (Needs Improvement) to 5 (Exceptional)
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loveLanguages.map((language) => (
                    <div key={language} className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{language}</Label>
                      {renderStars(language, formData.loveLanguageRatings[language] || 0)}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(4)} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Written Review */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <p className="text-sm text-gray-600">
                  Please share a respectful and honest summary of your experience. Focus on behavior and character, not
                  insults.
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.writtenReview}
                  onChange={(e) => setFormData((prev) => ({ ...prev, writtenReview: e.target.value }))}
                  placeholder="Describe your experience with this person. What were the highlights? What could have been better? Keep it constructive and respectful."
                  rows={6}
                  className="mb-4"
                />
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-yellow-800 mb-2">Review Guidelines</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Focus on behaviors and actions, not personal attacks</li>
                    <li>• Do not include full names, phone numbers, or addresses</li>
                    <li>• Keep your review honest but respectful</li>
                    <li>• Reviews are anonymous but you must be signed in</li>
                  </ul>
                </div>
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={!formData.writtenReview.trim()}>
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </main>
    </div>
  )
}
