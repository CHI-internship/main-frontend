import { ArrowDownward,ArrowUpward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import orderService from '../../api/orders.service';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { OrderCard, SortOrders } from '../../components/orders';
import Pagination from '../../components/pagination/Pagination';
import { IOrder, IOrderResponse } from '../../types';
import style from './Orders.module.scss';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);

  const [sortValue, setSortValue] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [page, setPage] = useState(1);

  const getOrders = async (page = 1) => {
    return orderService
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
    setPage(page);
  };

  const handleSorting = (sortValue: string) => {
    setSortValue(sortValue);
  };

  const handleClick = () => {
    sortType === 'asc' ? setSortType('desc') : setSortType('asc');
  }

  useEffect(() => {
    if (sortValue) getSortOrders(page, sortValue, sortType);
    else getOrders(page);
  }, [page, sortValue, sortType]);

  return (
    <>
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
