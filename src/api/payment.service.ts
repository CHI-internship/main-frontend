import { AxiosResponse } from 'axios'

import { IApproveDonatePayload, IPaymentPayload } from '../types'
import { axiosInstance } from './axios-instance'


class PaymentService {
    async sendPayment(paymentPayload: IPaymentPayload) {
        const secretKey = axiosInstance.post('payment', paymentPayload)
            .then((data: AxiosResponse) => data.data.client_secret)
        return secretKey
    }

    async approvePayment(approvePayload: IApproveDonatePayload) {
        return axiosInstance.patch('payment', approvePayload)
    }
}

export const paymentService = new PaymentService()