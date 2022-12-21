import { Button } from '@mui/material'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntentResult } from '@stripe/stripe-js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { paymentService } from '../../api'
import { IApproveDonatePayload } from '../../types'
import style from './Payment.module.scss'

export const CheckoutForm: React.FC<IApproveDonatePayload> = ({ amount, orderId }) => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [inProcess, setInProcess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (stripe && elements) {
            setInProcess(true)
            stripe.confirmPayment({ elements, redirect: 'if_required' })
                .then(async function (result: PaymentIntentResult) {
                    if (result.error) {
                        setError(error)
                        return
                    }
                    await paymentService.approvePayment({ amount, orderId })
                    navigate('/success-donate', { replace: true })
                })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <PaymentElement />
            <Button
                type='submit'
                sx={{ margin: '15px auto' }}
                variant='outlined'
                disabled={inProcess}
            >
                Donate
            </Button>
            <div>{error ?? error}</div>
        </form>
    )
}
