import { Client, Environment } from 'square'

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' 
    ? Environment.Production 
    : Environment.Sandbox,
})

export default squareClient

// Helper function to get Square location
export async function getSquareLocation() {
  try {
    const response = await squareClient.locationsApi.listLocations()
    return response.result.locations?.[0] || null
  } catch (error) {
    console.error('Error fetching Square location:', error)
    return null
  }
}

// Helper function to create a payment
export async function createPayment(
  sourceId: string,
  amount: number,
  currency: string = 'USD',
  locationId?: string
) {
  try {
    const paymentRequest = {
      sourceId,
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      },
      locationId: locationId || process.env.SQUARE_LOCATION_ID!,
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }

    const response = await squareClient.paymentsApi.createPayment(paymentRequest)
    return response.result.payment
  } catch (error) {
    console.error('Error creating Square payment:', error)
    throw error
  }
}

// Helper function to create a checkout session
export async function createCheckoutSession(
  lineItems: Array<{
    name: string
    quantity: string
    basePriceMoney: {
      amount: number
      currency: string
    }
  }>,
  successUrl: string,
  cancelUrl: string,
  locationId?: string
) {
  try {
    const checkoutRequest = {
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      checkout: {
        name: 'Jacksonville Home Pros',
        lineItems,
        redirectUrl: successUrl,
        cancelUrl,
      },
      locationId: locationId || process.env.SQUARE_LOCATION_ID!,
    }

    const response = await squareClient.checkoutApi.createCheckout(checkoutRequest)
    return response.result.checkout
  } catch (error) {
    console.error('Error creating Square checkout session:', error)
    throw error
  }
} 