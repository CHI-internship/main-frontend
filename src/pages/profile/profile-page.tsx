import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../api';
import { Profile } from '../../components/profile';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';


const ProfilePage: React.FC = () => {
  const [error, setError] = useState(null as AxiosError);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token'))
      userService.retrieve(localStorage.getItem('token'))
        .catch(err => {
          if (typeof err === 'string') {
            localStorage.removeItem('token');
            navigate('/sign-in');
          } else setError(err)
        })
    else navigate('/sign-in')
  }, []);

  return (
    <>
      {error && <ErrorAlert error={error} />}
      <Profile />
    </>
  );
};

export default ProfilePage;
