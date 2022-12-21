export interface IVolunteer {
    id: number
    userId: number
    country: string
    city: string
    cardNumber: string
    document: string
    status: boolean
}

export interface IBase64Documents {
    base64File: string
    ext: string
}