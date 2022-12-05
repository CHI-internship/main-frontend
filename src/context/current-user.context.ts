import { createContext, useEffect, useState } from 'react'

import { userService } from '../api'
import { IUser } from '../types'

interface IUserContext {
    user: IUser,
    setUser: (user: IUser) => void,
    isVolunteer?: boolean
    setIsVolunteer?: (isVolunteer: boolean) => void,
}

export function useCurrentUser() {
    const [user, setUser] = useState<IUser>(null)
    const [roleIsVolunteer, setRoleIsVolunteer] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token && !user) userService.retrieve(token)
            .then((data: IUser) => { setUser(data) });
    }, [])

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) userService.retrieve(token)
        .then(async (data: IUser) => {
          const res =  await userService.roleIsVolunteer(data.id);
          if (res !== roleIsVolunteer) setRoleIsVolunteer(res);
        });
    }, [])

    return { user, setUser, isVolunteer: roleIsVolunteer, setIsVolunteer: setRoleIsVolunteer }
}

export const CurrentUserContext = createContext(null as IUserContext)