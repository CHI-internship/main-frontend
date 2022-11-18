import { FC, useEffect, useState } from 'react';
import Profile from '../../components/profile';
import userService from '../../api/user.service';
import { UserType } from '../../types/auth.types';
import { useNavigate } from 'react-router-dom';

const ProfilePage: FC = () => {
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
      {user && (
        <Profile
          id={user.id}
          name={user.name}
          lastname={user.lastname}
          email={user.email}
          orders={[{ id: 1, title: 'Test title', info: 'sho-to' }]}
        />
      )}
    </>
  );
};

export default ProfilePage;
