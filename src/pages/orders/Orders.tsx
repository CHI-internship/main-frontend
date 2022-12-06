import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import orderService from '../../api/orders.service';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import StatusFilter from '../../components/filters/status-filter/StatusFilter';
import { OrderCard } from '../../components/orders';
import Pagination from '../../components/pagination/Pagination';
import { IOrder, IOrderResponse } from '../../types';
import style from './Orders.module.scss';

interface IGetOrders {
  page?: number;
  limit?: number;
  statusFilter?: string;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');

  const getOrders = async (config: IGetOrders) => {
    await orderService
      .getOrders({
        page: config.page || 1,
        limit: config.limit || 10,
        status: config.statusFilter,
      })
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
    if (selectedFilter === 'all' || !selectedFilter) {
      getOrders({ page });
    } else {
      getOrders({ page, statusFilter: selectedFilter });
    }
  };

  const handleStatusFilter = (statusFilter: string) => {
    if (statusFilter === 'all') {
      setSelectedFilter(statusFilter);
      getOrders({});
    } else {
      setSelectedFilter(statusFilter);
      getOrders({ statusFilter });
    }
  };

  useEffect(() => {
    getOrders({});
  }, []);
  return (
    <>
      <StatusFilter getStatusFilter={handleStatusFilter} />
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
