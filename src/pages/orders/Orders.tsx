import { ArrowDownward,ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import orderService from '../../api/orders.service';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import StatusFilter from '../../components/filters/status-filter/StatusFilter';
import { OrderCard, SortOrders } from '../../components/orders';
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
  const [sortValue, setSortValue] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [page, setPage] = useState(1);

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

  const getSortOrders = async (page = 1, sortBy: string, sort: string) => {
    return orderService
      .getSortOrders(page, sortBy, sort)
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

  const handleSorting = (sortValue: string) => {
    setSortValue(sortValue);
  };

  const handleClick = () => {
    sortType === 'asc' ? setSortType('desc') : setSortType('asc');
  }

  useEffect(() => {
    getOrders({});
  }, []);
  return (
    <>
      <StatusFilter getStatusFilter={handleStatusFilter} />
     <SortOrders getSortValue={handleSorting}/>
     <IconButton color='primary' aria-label='sorting' onClick={handleClick}>
      {sortType === 'asc'
        ? ( <ArrowDownward />)
        : ( <ArrowUpward/> )
      }
    </IconButton>
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
