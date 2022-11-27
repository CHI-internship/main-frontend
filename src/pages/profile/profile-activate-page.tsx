import { FC, useEffect, useState } from 'react';
import userService from '../../api/user.service';
import { UserType } from '../../types/auth.types';
import { useNavigate } from 'react-router-dom';
import ProfileUpdate from '../../components/profile/profile-activate';

const ProfileActivatePage: FC = () => {
  const [user, setUser] = useState<UserType>();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const rawUser = await userService.retrieve(localStorage.getItem('token'));
      setUser(rawUser);
    };

    if (localStorage.getItem('token')) {
      getUser();
    } else {
      navigate('/sign-in');
    }
  }, []);

  return (
    <>
      {user ?  (
        <ProfileUpdate/>
      ) : null}
    </>
  );
};

export default ProfileActivatePage;
