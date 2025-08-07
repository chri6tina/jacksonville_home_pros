import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const photoreference = searchParams.get('photoreference')
  const maxwidth = searchParams.get('maxwidth') || '400'
  
  if (!photoreference) {
    return NextResponse.json(
      { error: 'Photoreference parameter is required' },
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
    const photoUrl = new URL('https://maps.googleapis.com/maps/api/place/photo')
    photoUrl.searchParams.set('photoreference', photoreference)
    photoUrl.searchParams.set('maxwidth', maxwidth)
    photoUrl.searchParams.set('key', apiKey)
    
    const photoResponse = await fetch(photoUrl.toString())
    
    if (!photoResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch photo' },
        { status: 400 }
      )
    }
    
    // Get the photo as a blob
    const photoBlob = await photoResponse.blob()
    
    // Return the photo with appropriate headers
    return new NextResponse(photoBlob, {
      headers: {
        'Content-Type': photoResponse.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    })
    
  } catch (error) {
    console.error('Google Places Photo API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photo' },
      { status: 500 }
    )
  }
} 