import { IResetUserPassword, IUpdateUserPassword, IUpdateUserProfile } from "../types/user.types"
import { axiosInstance } from "./axios-instance"

class UserService {

    async updatePofile({ userId, name, lastname }: IUpdateUserProfile) {
        const updatedUser = await axiosInstance.patch(
            'user', { userId, name, lastname })
            .then((data: any) => data.data)
        return updatedUser
    }

    async forgotPassword(email: string) {
        const emailSent = await axiosInstance.post(
            'password/forgot', { email })
            .then((data: any) => data.data)
        return emailSent
    }

    async resetPassword(data: IResetUserPassword) {
        const passwordReseted = await axiosInstance.patch(
            'password/reset', { ...data })
            .then((data: any) => data.data)
        return passwordReseted
    }

    async updatePassword(data: IUpdateUserPassword) {
        const passwordUpdated = await axiosInstance.patch(
            'password/update', { ...data })
            .then((data: any) => data.data)
        return passwordUpdated
    }
}

const userService = new UserService()
export default userService