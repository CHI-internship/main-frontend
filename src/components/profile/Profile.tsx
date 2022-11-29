import style from './Profile.module.scss';
import { useContext } from 'react';
import ProfileName from './profile-name';
import ProfileAvatar from './profile-avatar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context';
import { IOrder, IUserRole } from '../../types';
import { OrderCard } from '../orders';


export const Profile: React.FC = () => {
  const { user } = useContext(CurrentUserContext)
  const navigate = useNavigate();

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
