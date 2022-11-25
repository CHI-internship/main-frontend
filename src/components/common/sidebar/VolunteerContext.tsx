import { createContext, useState, FC, useContext } from 'react';

const VolunteerContext = createContext(null);

interface IChildren {
  children: JSX.Element;
}

export const useVolunteer = () => {
  return useContext(VolunteerContext);
}

export const VolunteerProvider: FC<IChildren> = ({ children }) => {

  const [isVolunteer, setIsVolunteer] = useState(true);

  return (
    <VolunteerContext.Provider value={isVolunteer} >
      { children }
    </VolunteerContext.Provider>
  )
}