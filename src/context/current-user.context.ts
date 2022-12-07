import { createContext, useEffect, useState } from 'react';

import { userService } from '../api';
import { retrieveUser } from '../helpers/retrieveUser';
import { IUser } from '../types';

interface IUserContext {
  user: IUser;
  setUser: (user: IUser) => void;
  isVolunteer?: boolean;
  setIsVolunteer?: (isVolunteer: boolean) => void;
}

export function useCurrentUser() {
  const [user, setUser] = useState<IUser>(null);
  const [roleIsVolunteer, setRoleIsVolunteer] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access-token');

    if (token && !user)
      retrieveUser(setUser).then((data: IUser) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access-token');

    if (token)
      retrieveUser(setUser).then(async (data: IUser) => {
        const res = await userService.roleIsVolunteer(data.id);
        if (res !== roleIsVolunteer) setRoleIsVolunteer(res);
      });
  }, []);

  return {
    user,
    setUser,
    isVolunteer: roleIsVolunteer,
    setIsVolunteer: setRoleIsVolunteer,
  };
}

export const CurrentUserContext = createContext(null as IUserContext);
