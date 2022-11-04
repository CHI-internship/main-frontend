import { axiosInstance } from "../axios-instance"

interface IUpdateProfile {
  userId: number
  name: string
  lastname: string
}

export async function updatePofile({ userId, name, lastname }: IUpdateProfile) {
  const updatedUser = await axiosInstance.patch(
    'user', { userId, name, lastname })
    .then(data => data.data)

  return updatedUser
}

