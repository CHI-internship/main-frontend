import { useEffect, useState } from 'react';
import orderService from '../../api/orders.service';
import { OrderCard } from '../../components/orders/OrderCard';
import { IOrder } from '../../types/order.types';
import style from './Orders.module.scss';
import Pagination from '../../components/pagination/Pagination';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handlePagination = (page: number) => {
    getOrders(page);
  };

  const getOrders = async (page = 1) => {
    await orderService
      .getOrders(undefined, page, undefined)
      .then((data: any) => {
        setTotalPages(data.totalPages);
        return data;
      })
      .then((data: any) => setOrders(data.data));
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
