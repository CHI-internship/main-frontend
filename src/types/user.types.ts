import { IOrder } from './order.types';
import { IVolunteer } from './volunteer.type';

export interface IUser {
    id: number
    email: string
    lastname: string
    name: string
    orders: IOrder[]
    photo: string
    role: IUserRole
    volunteer?: IVolunteer
    updatedAt: string
    createdAt: string
}

export interface IUpdateProfile {
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

export interface IForgotPassword {
    email: string
    recaptchaToken: string
}

export interface IUpdatePassword {
    oldPassword: string
    newPassword: string
    userId: number
}

export enum IUserRole {
    CUSTOMER = 'customer',
    VOLUNTEER = 'volunteer'
}