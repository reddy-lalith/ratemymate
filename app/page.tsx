"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HomePage() {
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastName: "",
    college: "",
  })
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchData.firstName && searchData.lastName && searchData.college) {
      const searchParams = new URLSearchParams({
        firstName: searchData.firstName,
        lastName: searchData.lastName,
        college: searchData.college,
      })
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Subtle floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-rose-100 animate-gentle-float">
          <Heart className="w-6 h-6" />
        </div>
        <div className="absolute top-40 right-20 text-blush-100 animate-gentle-float" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-5 h-5" />
        </div>
        <div
          className="absolute bottom-40 right-10 text-rose-100 animate-gentle-float"
          style={{ animationDelay: "1s" }}
        >
          <Heart className="w-5 h-5" />
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

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-5xl font-bold text-gray-900">Date Smarter.</h1>
            <Heart className="w-8 h-8 text-rose-400 ml-4 animate-subtle-pulse" />
          </div>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Find honest reviews from past partners. Make more informed decisions about your dating life.
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-rose-100">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="First name (e.g., Pushti)"
                    className="h-12 text-lg border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                    value={searchData.firstName}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Last name (e.g., Lee)"
                    className="h-12 text-lg border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                    value={searchData.lastName}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="College (e.g., UNC Chapel Hill)"
                    className="h-12 text-lg border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                    value={searchData.college}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, college: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8 bg-rose-600 hover:bg-rose-700 text-white">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </form>

              <p className="text-sm text-gray-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2 text-blush-400" />
                Search by first name, last name, and college to find reviews
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center">
            How It Works
            <Heart className="w-6 h-6 text-rose-400 ml-3" />
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-50 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-gray-600">Search for someone by their first name, last name, and college</p>
            </div>
            <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-50 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600">Read honest, anonymous reviews from past partners</p>
            </div>
            <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-rose-50 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Decide</h3>
              <p className="text-gray-600">Make more informed decisions about your dating life</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-rose-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2024 Rate My Mate. All reviews represent personal opinions.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-rose-600 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-rose-600 text-sm">
                Terms of Service
              </Link>
              <Link href="/guidelines" className="text-gray-600 hover:text-rose-600 text-sm">
                Community Guidelines
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
