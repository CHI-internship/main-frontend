import style from './Profile.module.scss';
import ProfileName from './profile-name';
import ProfileAvatar from './profile-avatar';
import Order from '../common/order';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IProfileProps {
  id: number;
  avatar?: string;
  name: string;
  lastname: string;
  email: string;
  orders: Array<{ id: number; title: string; info: string }>;
}

export const Profile: React.FC<IProfileProps> = ({
  id,
  avatar,
  name,
  lastname,
  email,
  orders,
}: IProfileProps) => {
  const navigate = useNavigate();

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
        <Button
          variant='contained'
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/sign-in');
          }}
        >
          Logout
        </Button>
        <Button 
          variant='contained'
          onClick={() => {
            navigate(`/profile/${id}/activate`);
          }}
        >
          Activate profile
        </Button>
      </div>
      <div className={style.orders}>
        {orders.map(el => (
          <Order key={el.id} id={el.id} title={el.title} info={el.info} />
        ))}
        {!orders.length && <div>No orders</div>}
      </div>
    </div>
  );
};
