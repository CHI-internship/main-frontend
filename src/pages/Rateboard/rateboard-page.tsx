import { useEffect, useState } from 'react';

import { userService } from '../../api';
import ChooseRole from '../../components/rateboard/ChooseRole';
import Rateboard from '../../components/rateboard/Rateboard';
import { IUserScore } from '../../types';

const RateboardPage: React.FC = () => {
  const [userData, setUserData] = useState([] as IUserScore[]);
  const [role, setRole] = useState('user');

  const getUsers = async (role: string) => {
    await userService.getUsersForRateboard(role)
      .then((data: IUserScore[]) => setUserData(data));
  };

  const handleRole = (role: string) => {
    setRole(role);
  };

  useEffect(() => {
    getUsers(role);
  }, [role]);

  return(
    <>
    <ChooseRole getRole={handleRole}/>
    <Rateboard users={userData} role={role}/>
    </>
  );
};

export default RateboardPage;