import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../api';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { Profile } from '../../components/profile';
import { CurrentUserContext } from '../../context';
import { checkIsUserAuthorized } from '../../helpers/isUserAuthorized';
import { retrieveUser } from '../../helpers/retrieveUser';

const ProfilePage: React.FC = () => {
  const { setUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null as AxiosError);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveUser(setUser, () => navigate('/sign-in'), setError);
    checkIsUserAuthorized(() => navigate('/sign-in'));
  }, []);

  return (
    <>
      {error && <ErrorAlert error={error} />}
      <Profile />
    </>
  );
};

export default ProfilePage;
