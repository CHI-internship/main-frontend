import { useEffect, useState } from 'react';
import orderService from '../../api/orders.service';
import { OrderCard } from '../../components/orders';
import { IOrder } from '../../types';
import style from './Orders.module.scss';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { AxiosError } from 'axios';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null as AxiosError);

  const getOrders = async () => {
    await orderService
      .getOrders()
      .then((data: any) => setOrders(data.data))
      .catch(err => {
        setError(err);
        setOrders([]);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className={style.orders}>
      {error && <ErrorAlert error={error} />}
      {orders.map((item: IOrder) => (
        <OrderCard key={item.id} order={item} />
      ))}
    </div>
  );
};
