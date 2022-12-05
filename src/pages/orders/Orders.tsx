import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import orderService from '../../api/orders.service';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { OrderCard } from '../../components/orders';
import Pagination from '../../components/pagination/Pagination';
import { IOrder, IOrderResponse } from '../../types';
import style from './Orders.module.scss';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);

  const getOrders = async (page = 1) => {
    await orderService
      .getOrders(page)
      .then((data: IOrderResponse) => {
        setOrders(data.data);
        setTotalPages(data.totalPages);
        return data;
      })
      .catch(err => {
        setError(err);
        setOrders([]);
      });
  };

  const handlePagination = (page: number) => {
    getOrders(page);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className={style.orders}>
        {error && <ErrorAlert error={error} />}
        {orders.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </div>
      <Pagination totalCount={totalPages} getPage={handlePagination} />
    </>
  );
};
