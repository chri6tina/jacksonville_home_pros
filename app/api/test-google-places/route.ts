import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  
  if (!apiKey) {
    return NextResponse.json({
      status: 'error',
      message: 'Google Places API key not found in environment variables',
      hasApiKey: false
    })
  }

  try {
    // Test with a simple search
    const testUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    testUrl.searchParams.set('query', 'Jacksonville Beach, FL')
    testUrl.searchParams.set('key', apiKey)
    
    const response = await fetch(testUrl.toString())
    const data = await response.json()
    
    return NextResponse.json({
      status: 'success',
      message: 'Google Places API test completed',
      hasApiKey: true,
      apiResponse: {
        status: data.status,
        error_message: data.error_message,
        results_count: data.results?.length || 0
      },
      apiKeyPreview: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to test Google Places API',
      hasApiKey: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 