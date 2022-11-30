import { AxiosResponse } from 'axios'

import { IPaymentPayload } from '../types'
import { axiosInstance } from './axios-instance'


class PaymentService {
    async sendPayment({ amount, currency, description, id }: IPaymentPayload) {
        const secretKey = axiosInstance.post('stripe', { amount, currency, description, id })
            .then((data: AxiosResponse) => data.data.client_secret)
        return secretKey
    }
}

export const paymentService = new PaymentService()