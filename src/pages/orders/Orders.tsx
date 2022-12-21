import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import orderService from '../../api/orders.service';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import StatusFilter from '../../components/filters/status-filter/StatusFilter';
import { OrderCard, SortOrders } from '../../components/orders';
import Pagination from '../../components/pagination/Pagination';
import { IOrder } from '../../types';
import style from './Orders.module.scss';

interface IGetOrders {
  page?: number;
  limit?: number;
  statusFilter?: string;
  sort?: string;
  sortBy?: string;
}

export const Orders: React.FC = () => {
  // const [orders, setOrders] = useState<IOrder[]>([]);
  // const [error, setError] = useState(null as AxiosError);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortValue, setSortValue] = useState('name');
  const [sortType, setSortType] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error } = useQuery(
    [
      'orders',
      {
        page,
        limit,
        statusFilter: selectedFilter,
        sortBy: sortValue,
        sort: sortType,
      },
    ],
    async () => {
      const orders = await getOrders({
        page,
        limit,
        statusFilter: selectedFilter,
        sortBy: sortValue,
        sort: sortType,
      });

      return orders;
    },
    {
      cacheTime: 20000,
      keepPreviousData: true,
    }
  );

  const orders = data ?? [];

  const getOrders = async (config: IGetOrders) => {
    const res = await orderService.getOrders({
      page: config.page,
      limit: config.limit || 10,
      status: config.statusFilter,
      sortBy: config.sortBy,
      sort: config.sort,
    });

    setTotalPages(res.totalPages);

    console.log(res);
    return res.data;
    // await orderService
    //   .getOrders({
    //     page: config.page,
    //     limit: config.limit || 10,
    //     status: config.statusFilter,
    //     sortBy: config.sortBy,
    //     sort: config.sort,
    //   })
    //   .then((data: IOrderResponse) => {
    //     // setOrders(data.data);
    //     setTotalPages(data.totalPages);
    //     return data;
    //   })
    //   .catch(err => {
    //     setError(err);
    //     // setOrders([]);
    //     return [];
    //   });
  };

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const handleStatusFilter = (statusFilter: string) => {
    setPage(1);
    setSelectedFilter(statusFilter);
  };

  const handleSorting = (sortValue: string) => {
    setSortValue(sortValue);
  };

  const handleClick = () => {
    sortType === 'asc' ? setSortType('desc') : setSortType('asc');
  };

  useEffect(() => {
    // getOrders({
    //   page,
    //   limit,
    //   statusFilter: selectedFilter,
    //   sortBy: sortValue,
    //   sort: sortType,
    // });
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StatusFilter getStatusFilter={handleStatusFilter} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SortOrders getSortValue={handleSorting} />
            <IconButton
              color='primary'
              aria-label='sorting'
              onClick={handleClick}
              sx={{ height: '40px' }}
            >
              {sortType === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <div className={style.orders}>
        {/* {error && <ErrorAlert error={error} />} */}
        {orders.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalCount={totalPages}
        getPage={handlePagination}
      />
    </>
  );
};
