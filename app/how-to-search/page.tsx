import SearchFlow from "@/components/search-flow"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HowToSearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Rate My Mate
            </Link>
            <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="py-8">
        <SearchFlow />
      </main>
    </div>
  )
}
