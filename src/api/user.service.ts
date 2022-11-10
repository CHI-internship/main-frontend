import { IForgotPassword, IResetPassword, IUpdatePassword, IUpdateProfile } from "../types/user.types"
import { axiosInstance } from "./axios-instance"

class UserService {

    async updatePofile({ userId, name, lastname }: IUpdateProfile) {
        const updatedUser = await axiosInstance.patch(
            'user', { userId, name, lastname })
            .then((data: any) => data.data)
        return updatedUser
    }

    async forgotPassword({ email, recaptchaToken }: IForgotPassword) {
        const emailSent = await axiosInstance.post(
            'password/forgot', { email, recaptchaToken })
            .then((data: any) => data.data)
        return emailSent
    }

    async resetPassword(data: IResetPassword) {
        const passwordReseted = await axiosInstance.patch(
            'password/reset', { ...data })
            .then((data: any) => data.data)
        return passwordReseted
    }

    async updatePassword(data: IUpdatePassword) {
        const passwordUpdated = await axiosInstance.patch(
            'password/update', { ...data })
            .then((data: any) => data.data)
        return passwordUpdated
    }
}

const userService = new UserService()
export default userService