import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const location = searchParams.get('location') || 'Jacksonville, FL'
  
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  // Check if API key is configured
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.error('Google Places API key not found in environment variables')
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Google Places API Search
    const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    searchUrl.searchParams.set('query', `${query} ${location}`)
    searchUrl.searchParams.set('key', apiKey)
    searchUrl.searchParams.set('type', 'business')
    
    console.log('Searching Google Places with URL:', searchUrl.toString())
    
    const searchResponse = await fetch(searchUrl.toString())
    const searchData = await searchResponse.json()
    
    console.log('Google Places API response:', searchData)
    
    if (searchData.status === 'REQUEST_DENIED') {
      console.error('Google Places API request denied. Error:', searchData.error_message)
      return NextResponse.json(
        { 
          error: 'Google Places API access denied',
          details: searchData.error_message || 'Check API key and billing configuration'
        },
        { status: 400 }
      )
    }
    
    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      return NextResponse.json(
        { error: `Google Places API error: ${searchData.status}`, details: searchData.error_message },
        { status: 400 }
      )
    }
    
    // If no results, return empty array
    if (searchData.status === 'ZERO_RESULTS' || !searchData.results) {
      return NextResponse.json({
        status: 'success',
        results: []
      })
    }
    
    // Get detailed information for each place (limit to 3 to avoid rate limits)
    const placesWithDetails = await Promise.all(
      searchData.results.slice(0, 3).map(async (place: any) => {
        try {
          const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
          detailsUrl.searchParams.set('place_id', place.place_id)
          detailsUrl.searchParams.set('fields', 'place_id,name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,photos,reviews,editorial_summary,types,business_status')
          detailsUrl.searchParams.set('key', apiKey)
          
          const detailsResponse = await fetch(detailsUrl.toString())
          const detailsData = await detailsResponse.json()
          
          if (detailsData.status === 'OK') {
            return {
              ...place,
              ...detailsData.result
            }
          }
          
          return place
        } catch (error) {
          console.error('Error fetching place details:', error)
          return place
        }
      })
    )
    
    return NextResponse.json({
      status: 'success',
      results: placesWithDetails
    })
    
  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Google Places data' },
      { status: 500 }
    )
  }
} 