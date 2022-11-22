import { FC } from 'react';
import style from './OrderDetails.module.scss';
import { IOrder } from '../../../types';
import { ProgressBar } from '../../common';

interface IOrderCardProps {
  order: IOrder
}
const OrderDetails: FC<IOrderCardProps> = ({ order }) => (
  <div className={style.container}>
    <div className={style.title}>
      <h1>{order?.title}</h1>
      <p>{order?.info}</p>
    </div>
    <div className={style.main}>
      <div className={style.image}
        style={{ backgroundImage: `url(${order?.photo})` }}>
      </div>
      <div className={style.content}>
        <div className={order?.status === 'open' ? style.gathering_open : style.gathering_close}>
          <h4>{order?.status === 'open' ? 'Відкритий збір' : 'Збір закрито'}</h4>
        </div>
        <ProgressBar moneyHave={order?.sum} moneyNeed={order?.goal_amount}
          closedAt={new Date(order?.finished_at)} size='large' />
        <p>{order?.short_info}</p>
        <button>Підтримати</button>
      </div>
    </div>
  </div>
);

export default OrderDetails;