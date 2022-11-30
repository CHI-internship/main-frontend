import { createContext, useEffect, useState } from 'react';

import { retrieveUser } from '../helpers/retrieveUser';
import { IUser } from '../types';

interface IUserContext {
  user: IUser;
  setUser: (user: IUser) => void;
}

export function useCurrentUser() {
  function setUser(user: IUser) {
    setUserState({ user, setUser });
  }
  const [user, setUserState] = useState<IUserContext>({ user: null, setUser });

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token && !user.user) retrieveUser(setUser);
  }, []);

  return user;
}

export const CurrentUserContext = createContext(null as IUserContext);
