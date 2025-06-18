import { supabase, Person, Review, PersonWithStats } from './supabase'

// Re-export the interfaces for use in other files
export type { Person, Review, PersonWithStats } from './supabase'

// Search for people by name and college
export async function searchPeople(firstName: string, lastName: string, college: string): Promise<PersonWithStats[]> {
  try {
    // First, find the person
    const { data: people, error } = await supabase
      .from('people')
      .select('*')
      .ilike('first_name', firstName)
      .ilike('last_name', lastName)
      .ilike('college', `%${college}%`)

    if (error) {
      console.error('Error searching people:', error)
      return []
    }

    if (!people || people.length === 0) {
      return []
    }

    // Get stats for each person
    const peopleWithStats = await Promise.all(
      people.map(async (person) => {
        const stats = await getPersonStats(person.id)
        return {
          id: person.id,
          first_name: person.first_name,
          last_name: person.last_name,
          college: person.college,
          ...stats
        }
      })
    )

    return peopleWithStats
  } catch (error) {
    console.error('Error in searchPeople:', error)
    return []
  }
}

// Get statistics for a person
async function getPersonStats(personId: string) {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('person_id', personId)

    if (error) {
      console.error('Error getting reviews:', error)
      return {
        date_again_percentage: 0,
        total_reviews: 0,
        top_tags: []
      }
    }

    if (!reviews || reviews.length === 0) {
      return {
        date_again_percentage: 0,
        total_reviews: 0,
        top_tags: []
      }
    }

    // Calculate would date again percentage
    const wouldDateAgain = reviews.filter(review => review.would_date_again).length
    const dateAgainPercentage = Math.round((wouldDateAgain / reviews.length) * 100)

    // Get top tags
    const allTags = reviews.flatMap(review => review.tags || [])
    const tagCounts: Record<string, number> = {}
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })

    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag)

    return {
      date_again_percentage: dateAgainPercentage,
      total_reviews: reviews.length,
      top_tags: topTags
    }
  } catch (error) {
    console.error('Error in getPersonStats:', error)
    return {
      date_again_percentage: 0,
      total_reviews: 0,
      top_tags: []
    }
  }
}

// Create a new person
export async function createPerson(firstName: string, lastName: string, college: string): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          college: college
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating person:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createPerson:', error)
    return null
  }
}

// Get a person by ID
export async function getPerson(personId: string): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', personId)
      .single()

    if (error) {
      console.error('Error getting person:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getPerson:', error)
    return null
  }
}

// Create a new review
export async function createReview(
  personId: string,
  rating: number,
  wouldDateAgain: boolean,
  tags: string[],
  reviewText: string
): Promise<Review | null> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          person_id: personId,
          rating: rating,
          would_date_again: wouldDateAgain,
          tags: tags,
          review_text: reviewText
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating review:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createReview:', error)
    return null
  }
}

// Get reviews for a person
export async function getPersonReviews(personId: string): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('person_id', personId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting reviews:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getPersonReviews:', error)
    return []
  }
} 