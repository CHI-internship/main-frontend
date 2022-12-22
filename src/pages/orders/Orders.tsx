import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, CircularProgress, IconButton } from '@mui/material';
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
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortValue, setSortValue] = useState('name');
  const [sortType, setSortType] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, data, error, isError } = useQuery<IOrder[], AxiosError>(
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

  const getOrders = async (config: IGetOrders) => {
    const res = await orderService.getOrders({
      page: config.page,
      limit: config.limit || 10,
      status: config.statusFilter,
      sortBy: config.sortBy,
      sort: config.sort,
    });

    setTotalPages(res.totalPages);

    return res.data;
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
        {isError && <ErrorAlert error={error} />}
        {data?.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </div>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <Pagination
        currentPage={page}
        totalCount={totalPages}
        getPage={handlePagination}
      />
    </>
  );
};
