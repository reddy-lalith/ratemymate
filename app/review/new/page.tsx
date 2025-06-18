"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Heart, Star } from "lucide-react"
import Link from "next/link"
import { createPerson, createReview, getPerson } from "@/lib/database"

const AVAILABLE_TAGS = [
  "Amazing Communicator",
  "Incredibly Supportive", 
  "Loyal",
  "Funny",
  "Great Communicator",
  "Respectful",
  "Kind",
  "Intelligent",
  "Ambitious",
  "Creative",
  "Athletic",
  "Musical",
  "Adventurous",
  "Reliable",
  "Honest"
]

export default function NewReviewPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    firstName: searchParams.get("firstName") || "",
    lastName: searchParams.get("lastName") || "",
    college: searchParams.get("college") || "",
    rating: 5,
    wouldDateAgain: true,
    selectedTags: [] as string[],
    reviewText: ""
  })
  
  const [loading, setLoading] = useState(false)
  const [personId, setPersonId] = useState<string | null>(null)

  // Check if person exists when component mounts
  useEffect(() => {
    const checkPerson = async () => {
      if (formData.firstName && formData.lastName && formData.college) {
        // For now, we'll create a new person if they don't exist
        // In a real app, you'd want to search first
        const person = await createPerson(formData.firstName, formData.lastName, formData.college)
        if (person) {
          setPersonId(person.id)
        }
      }
    }
    
    checkPerson()
  }, [formData.firstName, formData.lastName, formData.college])

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!personId) {
      alert("Please wait while we set up the person's profile...")
      return
    }

    if (formData.selectedTags.length === 0) {
      alert("Please select at least one tag")
      return
    }

    if (!formData.reviewText.trim()) {
      alert("Please write a review")
      return
    }

    setLoading(true)

    try {
      const review = await createReview(
        personId,
        formData.rating,
        formData.wouldDateAgain,
        formData.selectedTags,
        formData.reviewText
      )

      if (review) {
        router.push(`/person/${personId}`)
      } else {
        alert("Failed to create review. Please try again.")
      }
    } catch (error) {
      console.error("Error creating review:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
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
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Write a Review</h1>
          <p className="text-gray-600 mt-2">
            Share your honest experience with {formData.firstName} {formData.lastName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-rose-500" />
                Person Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  value={formData.college}
                  onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-rose-500" />
                Rating & Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Overall Rating</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{formData.rating}/5</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wouldDateAgain"
                  checked={formData.wouldDateAgain}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, wouldDateAgain: checked as boolean }))
                  }
                />
                <Label htmlFor="wouldDateAgain">Would you date this person again?</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Personality Traits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={formData.selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label htmlFor={tag} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Share your honest experience with this person..."
                value={formData.reviewText}
                onChange={(e) => setFormData(prev => ({ ...prev, reviewText: e.target.value }))}
                rows={6}
                required
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-rose-600 hover:bg-rose-700 text-white px-8"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
