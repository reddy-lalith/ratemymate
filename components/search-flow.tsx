"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, Plus, AlertCircle, GraduationCap } from "lucide-react"

export default function SearchFlow() {
  const [step, setStep] = useState(1)
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastInitial: "",
    college: "",
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Find Someone on Rate My Mate</h1>
        <p className="text-gray-600">Follow these steps to search for and find people on the platform</p>
      </div>

      {/* Step 1: Search Form */}
      <Card className="border-2 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
              1
            </span>
            Enter Search Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input
                placeholder="e.g., John"
                value={searchData.firstName}
                onChange={(e) => setSearchData((prev) => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Initial</label>
              <Input
                placeholder="e.g., D"
                maxLength={1}
                value={searchData.lastInitial}
                onChange={(e) => setSearchData((prev) => ({ ...prev, lastInitial: e.target.value.toUpperCase() }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                College
              </label>
              <Input
                placeholder="e.g., NYU"
                value={searchData.college}
                onChange={(e) => setSearchData((prev) => ({ ...prev, college: e.target.value }))}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-900 mb-2">Why These Three Fields?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • <strong>First Name + Last Initial:</strong> Provides enough identification while protecting privacy
              </li>
              <li>
                • <strong>College:</strong> Distinguishes between people with the same name from different schools
              </li>
              <li>
                • <strong>Prevents Duplicates:</strong> Ensures all reviews for one person are consolidated
              </li>
              <li>
                • <strong>Relevant Context:</strong> College is where many dating relationships begin
              </li>
            </ul>
          </div>

          <Button
            onClick={() => setStep(2)}
            disabled={!searchData.firstName || !searchData.lastInitial || !searchData.college}
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Search for This Person
          </Button>
        </CardContent>
      </Card>

      {/* Step 2: Search Results */}
      {step >= 2 && (
        <Card className="border-2 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                2
              </span>
              Search Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Scenario A: Person Found */}
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <h4 className="font-medium text-green-900 mb-2">✅ Person Found</h4>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold">
                        {searchData.firstName || "Pushti"} {searchData.lastInitial || "L"}.
                      </h5>
                      <div className="flex items-center text-gray-600 mt-1">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        <span>{searchData.college || "UNC Chapel Hill"}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-lg font-bold text-green-600">100% would date again</span>
                        <span className="text-sm text-gray-500">8 reviews</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-green-100 text-green-800">Amazing Communicator</Badge>
                        <Badge className="bg-green-100 text-green-800">Incredibly Supportive</Badge>
                      </div>
                    </div>
                    <Button onClick={() => setStep(3)}>View Profile</Button>
                  </div>
                </div>
              </div>

              {/* Scenario B: Person Not Found */}
              <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">❓ Person Not Found</h4>
                <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-3">
                    No one found matching "{searchData.firstName || "John"} {searchData.lastInitial || "D"}." at{" "}
                    {searchData.college || "NYU"}
                  </p>
                  <Button onClick={() => setStep(4)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Be the First to Review
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: View Profile */}
      {step >= 3 && (
        <Card className="border-2 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                3
              </span>
              View Profile & Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 border rounded-lg p-4">
              <h4 className="font-medium mb-3">On the profile page, you'll see:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong>Overall Rating:</strong> Percentage who would date this person again
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong>Love Language Scorecard:</strong> Ratings for each of the 5 love languages
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>Trait Tags:</strong> Most common positive and negative characteristics
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-100 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </span>
                  <span>
                    <strong>Individual Reviews:</strong> Anonymous detailed experiences from past partners
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Create New Profile */}
      {step >= 4 && (
        <Card className="border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                4
              </span>
              Create New Profile (If Person Not Found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Dynamic Page Creation</h4>
                  <p className="text-sm text-yellow-800">
                    When you search for someone who doesn't have a page yet, you can create one by writing the first
                    review. This ensures the platform grows organically with real experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">What happens when you write the first review:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  A new page is automatically created for "{searchData.firstName || "Pushti"}{" "}
                  {searchData.lastInitial || "L"}." at {searchData.college || "UNC Chapel Hill"}
                </li>
                <li>Your review becomes the first entry on their profile</li>
                <li>Future searches for this person will find the page you created</li>
                <li>Other users can now add their own reviews to the same page</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 Search Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">For Best Results:</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Use the exact first name they go by</li>
                <li>• Include the full college name or common abbreviation</li>
                <li>• Try variations (NYU vs New York University)</li>
                <li>• Consider if they transferred schools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Privacy Protection:</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Only first name + last initial shown</li>
                <li>• No full names or personal details</li>
                <li>• Reviews are anonymous</li>
                <li>• People can claim their own pages</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
