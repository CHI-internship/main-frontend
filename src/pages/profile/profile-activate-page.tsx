import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../api';
import { ProfileActivate } from '../../components/profile';

const ProfileActivatePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userService.retrieve(localStorage.getItem('token'))
        .catch(() => navigate('/sign-in'))
    }
    else navigate('/sign-in')
  }, []);

  return <ProfileActivate />
};

export default ProfileActivatePage;
