import { IResetUserPassword, IUpdateUserProfile } from "../types/user.types"
import { axiosAuthInstance, axiosInstance } from "./axios-instance"

class UserService {

    async updatePofile({ userId, name, lastname }: IUpdateUserProfile) {
        const updatedUser = await axiosInstance.patch(
            'user', { userId, name, lastname })
            .then((data: any) => data.data)
        return updatedUser
    }

    async forgotPassword(email: string) {
        const emailSent = await axiosAuthInstance.post(
            'password/forgot', { email })
            .then((data: any) => data.data)
        return emailSent
    }

    async resetPassword(data: IResetUserPassword) {
        const passwordReseted = await axiosAuthInstance.patch(
            'password/reset', { ...data })
            .then((data: any) => data.data)
        return passwordReseted
    }
}

const userService = new UserService()
export default userService