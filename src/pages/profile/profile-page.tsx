import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/user.service';
import Profile from '../../components/profile';
import { UserType } from '../../types';
import { AxiosError } from 'axios';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';


const ProfilePage: FC = () => {
  const [user, setUser] = useState<UserType>();
  const [error, setError] = useState(null as AxiosError);

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
          avatar={user.photo}
          orders={[{ id: 1, title: 'Test title', info: 'sho-to' }]}
        />
      )}
    </>
  );
};

export default ProfilePage;
