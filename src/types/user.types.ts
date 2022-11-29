export interface IUpdateProfile {
    userId: number
    name?: string
    lastname?: string
    image?: any
}
export interface IActivateVolunteer {
    userId: number
    country: string,
    city: string,
    card_number: string,
    document: string,
    expansion: string
}

export interface IResetPassword {
    resetToken: string | null
    newPassword: string
    newPasswordConfirm: string
    recaptchaToken?: string
}

export interface IUpdatePassword {
    oldPassword: string
    newPassword: string
    userId: number
}

export interface IForgotPassword {
    email: string
    recaptchaToken?: string
}

export interface IUser {
    id: number,
    name: string,
    lastname: string,
    email: string,
    photo: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}