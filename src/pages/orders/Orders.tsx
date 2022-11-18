import { useEffect, useState } from 'react';
import { OrderCard } from '../../components/orders/OrderCard/OrderCard';
import Pagination from '../../components/pagination/Pagination';
import { IOrder, IOrderResponse } from '../../types/order.types';
import orderService from '../../api/orders.service';
import style from './Orders.module.scss';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handlePagination = (page: number) => {
    getOrders(page);
  };

  const getOrders = async (page = 1) => {
    await orderService
      .getOrders(undefined, page, undefined)
      .then((data: IOrderResponse) => {
        setTotalPages(data.totalPages);
        return data;
      })
      .then((data: IOrderResponse) => setOrders(data.data));
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className={style.orders}>
        {orders.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </div>
      <Pagination totalCount={totalPages} getPage={handlePagination} />
    </>
  );
};
