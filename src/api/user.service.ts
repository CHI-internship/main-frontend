import { IUpdateUserProfile } from "../types/user.types"
import { axiosInstance } from "./axios-instance"

class UserService {

    async updatePofile({ userId, name, lastname }: IUpdateUserProfile) {
        const updatedUser = await axiosInstance.patch(
            'user', { userId, name, lastname })
            .then(data => data.data)

        return updatedUser
    }
}

const userService = new UserService()
export default userService