import axios from 'axios'

export async function updateProfileName(userId: number, name: string) {
  const updatedName: string = await axios.put(
    `${process.env.REACT_APP_BASE_SERVICE_URL}user-update/name`,
    { userId, name })
    .then((data) => data.data?.name)

  return updatedName
}

export async function updateProfileLastname(userId: number, lastname: string) {
  const updatedLastname: string = await axios.put(
    `${process.env.REACT_APP_BASE_SERVICE_URL}user-update/lastname`,
    { userId, lastname })
    .then((data) => data.data?.lastname)

  return updatedLastname
}

export async function updateProfilePhoto(userId: number, file: any) {
  const formData = new FormData()
  formData.append('userId', String(userId))
  formData.append('photo', file)

  const updatedPhoto: string = await axios.put(
    `${process.env.REACT_APP_BASE_SERVICE_URL}user-update/photo`, formData)
    .then((data) => data.data?.photo)

  return updatedPhoto
}

