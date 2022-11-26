import { IOrder } from './order.types';
import { IVolunteer } from './volunteer.type';

export interface IUser {
    id: number
    email: string
    lastname: string
    name: string
    orders: IOrder[]
    photo: string
    role: 'customer' | 'volunteer'
    volunteer?: IVolunteer
    updatedAt: string
    createdAt: string
}

export interface IUpdateUserProfile {
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