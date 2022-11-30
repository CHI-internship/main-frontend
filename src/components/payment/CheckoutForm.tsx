import { Button } from '@mui/material'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'
import { useState } from 'react'

import style from './Payment.module.scss'

export const CheckoutForm: React.FC = () => {
    const stripe = useStripe()
    const elements = useElements()

    const [inProcess, setInProcess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (stripe && elements) {
            setInProcess(true)
            await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: `${window.location.origin}/success-donate` }
            })
                .catch((err: StripeError) => setError(err.message))
                .finally(() => setInProcess(false))
        }
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <PaymentElement />
            <Button sx={{ margin: '15px auto' }} type='submit'
                variant='outlined' disabled={inProcess}>
                Donate
            </Button>
            {error ?? error}
        </form>
    )
}
