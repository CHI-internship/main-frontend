import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '../../api';
import { CurrentUserContext } from '../../context';
import { IOrder, IUserRole } from '../../types';
import { OrderCard } from '../orders';
import style from './Profile.module.scss';
import ProfileAvatar from './profile-avatar';
import ProfileName from './profile-name';

export const Profile: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const getUserWithVolunteer = async () => {
      const userWithVolunteerandOrders = await userService.getUserWithVolunteerAndOrders();
      setUser(userWithVolunteerandOrders);
    }
    getUserWithVolunteer();
  }) 
  return (
    <div className={style.profile}>
      <div className={style.info}>
        <ProfileAvatar />
        <ProfileName />
        <div className={style.email}>{user?.email}</div>

        {!user?.volunteer?.status &&
          <Button variant='text'
            onClick={() => { navigate(`/profile/${user?.id}/activate`) }}>
            Activate profile
          </Button>}
      </div>
      {(user?.role === IUserRole.VOLUNTEER) &&
        <div className={style.orders}>
          {!user?.orders.length && <div>No orders</div>}
          {user?.orders?.map((item: IOrder) =>
            <OrderCard key={item.id} order={item} />)}
        </div>}
    </div>
  );
};
