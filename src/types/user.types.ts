export interface IUpdateProfile {
    userId: number
    name?: string
    lastname?: string
    image?: any
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