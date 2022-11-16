import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import orderService from '../../api/orders.service';
import { IOrder } from '../../types/order.types';
import style from './Order.module.scss';
import ProgressBar from '../../components/progressbar/Progressbar';

const Order: FC = () => {

  const [order, setOrder] = useState<IOrder>();
  const { state } = useLocation();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (state) {
      setOrder(state);
    } else {
      orderService.getOrderById(id).then(value => setOrder(value));
    }
  }, []);

  return (
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
};
export default Order;