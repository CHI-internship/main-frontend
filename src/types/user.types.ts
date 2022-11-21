export interface IUpdateUserProfile {
    userId: number
    name?: string
    lastname?: string
    image?: any
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