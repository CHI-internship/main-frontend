export interface IUpdateUserProfile {
    userId: number
    name: string
    lastname: string
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