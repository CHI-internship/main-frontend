import style from './Profile.module.scss'
import ProfileName from './profile-name';
import ProfileAvatar from './profile-avatar';
import Order from '../common/order';

interface IProfileProps {
  id: number
  avatar?: string
  name: string
  lastname: string
  email: string
  orders: Array<{ id: number, title: string, info: string }>
}

export const Profile: React.FC<IProfileProps> =
  ({ id, avatar, name, lastname, email, orders }: IProfileProps) => {

    return (
      <div className={style.profile}>
        <div className={style.info}>
          <ProfileAvatar userId={id} initialAvatar={avatar} />
          <ProfileName userId={id} initialName={name} initialLastname={lastname} />
          <div className={style.email}>{email}</div>
        </div>
        <div className={style.orders}>
          {orders.map(el => <Order key={el.id} id={el.id} title={el.title} info={el.info} />)}
          {!orders.length && <div>No orders</div>}
        </div>
      </div>
    );
  }