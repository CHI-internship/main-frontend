export interface IPaymentPayload {
    amount: number
    currency: string
    description: string
    orderId: number
}

export interface IApproveDonatePayload {
    orderId: number
    amount: number
}