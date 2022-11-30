export interface IPaymentPayload {
    amount: number
    currency: string
    description: string
    order_id: number
}

export enum PaymentCurrency {
    UAH = 'UAH',
    USD = 'USD',
    EUR = 'EUR'
}