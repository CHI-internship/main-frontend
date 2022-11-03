import axios from 'axios'

interface IUpdateName {
  userId: number
  name: string
  lastname: string
}

export async function updateName({ userId, name, lastname }: IUpdateName) {
  const updatedName = await axios.put(
    `${process.env.REACT_APP_BASE_SERVICE_URL}user-update/name`,
    { userId, name, lastname })
    .then(data => {
      return { name: data.data?.name, lastname: data.data?.lastname }
    })

  return updatedName
}

