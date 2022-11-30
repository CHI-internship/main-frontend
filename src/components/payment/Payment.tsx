import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import { paymentService } from '../../api'
import { CheckoutForm } from './CheckoutForm'


export const Payment: React.FC = () => {
    const [stripePromise, setStripePromise] = useState<any>()
    const [clientSecret, setClientSercet] = useState()


    useEffect(() => {
        setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY))
        async function setKey() {
            await paymentService.sendPayment(
                { amount: 100, currency: 'usd', description: 'adasdas', id: 2 })
                .then(data => setClientSercet(data))
        }
        setKey()
    }, [])
    return (
        <div>
            {
                (stripePromise && clientSecret) &&
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            }
        </div>
    )
}
