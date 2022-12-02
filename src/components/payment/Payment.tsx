import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import { paymentService } from '../../api'
import { IPaymentPayload } from '../../types'
import { CheckoutForm } from './CheckoutForm'

interface IPaymentProps {
  paymentPayload: IPaymentPayload
}

export const Payment: React.FC<IPaymentProps> = ({ paymentPayload }) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe>>()
  const [clientSecret, setClientSercet] = useState('')

  useEffect(() => {
    setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY))
    async function setKey() {
      await paymentService.sendPayment(paymentPayload)
        .then(data => setClientSercet(data))
    }
    setKey()
  }, [])

  if (!stripePromise || !clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}
