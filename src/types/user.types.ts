export interface IUpdateUserProfile {
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
    document: string
}

export interface IResetUserPassword {
    resetToken: string | null
    newPassword: string
    newPasswordConfirm: string
}

export interface IUpdateUserPassword {
    oldPassword: string
    newPassword: string
    userId: number
}