import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Profile from '../components/profile';
import userService from '../api/user.service';
import { UserType } from '../types/auth.types';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const ProfilePage: FC = () => {
  const [user, setUser] = useState<UserType>();
  const [error, setError] = useState<AxiosError>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const rawUser = await userService
        .retrieve(localStorage.getItem('token'))
        .catch(err => {
          if (typeof err === 'string') {
            localStorage.removeItem('token');
            navigate('/sign-in');
          } else {
            setError(err);
          }
        });
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
      {error && <ErrorAlert error={error} />}
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
