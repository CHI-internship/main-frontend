import style from './Profile.module.scss';
import { FC, useEffect, useState } from 'react';
import ProfileName from './profile-name';
import ProfileAvatar from './profile-avatar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types/auth.types';
import { retrieveUser } from '../../helpers/retrieveUser';

interface IProfileProps {
  id: number;
  avatar?: string;
  name: string;
  lastname: string;
  email: string;
  orders: Array<{ id: number; title: string; info: string }>;
}

export const Profile: FC<IProfileProps> = ({
  id,
  avatar,
  name,
  lastname,
  email,
  orders,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    retrieveUser(setUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <div className={style.profile}>
      <div className={style.info}>
        <ProfileAvatar userId={id} initialAvatar={avatar} />
        <ProfileName
          userId={id}
          initialName={name}
          initialLastname={lastname}
        />
        <div className={style.email}>{email}</div>
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
        {!user?.volunteer.status && <Button 
          variant='contained'
          onClick={() => {
            navigate(`/profile/${id}/activate`);
          }}
        >
          Activate profile
        </Button>}
      </div>
      <div className={style.orders}>
        {!orders.length && <div>No orders</div>}
      </div>
    </div>
  );
};
