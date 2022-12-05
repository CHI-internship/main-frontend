import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { ProfileActivate } from '../../components/profile';
import { CurrentUserContext } from '../../context';
import { checkIsUserAuthorized } from '../../helpers/isUserAuthorized';
import { retrieveUser } from '../../helpers/retrieveUser';

const ProfileActivatePage: React.FC = () => {
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
      <ProfileActivate />
    </>
  );
};

export default ProfileActivatePage;
