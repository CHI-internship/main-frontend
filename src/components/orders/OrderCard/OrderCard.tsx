import { Link } from 'react-router-dom';
import { IOrder } from '../../../types/order.types';
import ProgressBar from '../../progressbar/Progressbar';
import style from './OrderCard.module.scss';

interface IOrderCardProps {
  order: IOrder;
}

export const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
  return (
    <Link to={`/orders/${String(order.id)}`} state={order}>
      <div className={style.card}>
        <div
          className={style.img}
          style={{ backgroundImage: `url(${order.photo})` }}
        ></div>
        <div className={style.title}>{order.title}</div>
        <div className={style.info}>{order.info}</div>
        <ProgressBar
          closedAt={new Date(order.finished_at)}
          moneyHave={order.sum}
          moneyNeed={order.goal_amount}
        />
      </div>
    </Link>
  );
};
