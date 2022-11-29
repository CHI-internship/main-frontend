import { createContext, useEffect, useState } from 'react'

import { userService } from '../api'
import { IUser } from '../types'

interface IUserContext {
    user: IUser,
    setUser: (user: IUser) => void
}

export function useCurrentUser() {
    function setUser(user: IUser) { setUserState({ user, setUser }) }
    const [user, setUserState] = useState<IUserContext>({ user: null, setUser })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token && !user.user) userService.retrieve(token)
            .then((data: IUser) => setUser(data))
    }, [])

    return user
}

export const CurrentUserContext = createContext(null as IUserContext)