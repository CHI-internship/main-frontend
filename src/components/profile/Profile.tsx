import Order from '../common/order/Order'
import style from './Profile.module.scss'
import ProfileName from './profile-name/ProfileName'
import ProfileAvatar from './profile-avatar/ProfileAvatar'

interface IProfileProps {
  id: number
  avatar: string | null
  name: string
  lastname: string
  email: string
  orders: Array<{ id: number, title: string, info: string }>
}

export default function Profile({ id, avatar, name, lastname, email, orders }: IProfileProps) {

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