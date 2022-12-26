import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import StatusFilter from '../../components/filters/status-filter/StatusFilter';
import { OrderCard, SortOrders } from '../../components/orders';
import Pagination from '../../components/pagination/Pagination';
import { UseOrders } from '../../hooks/orders.hook';
import { IOrder } from '../../types';
import style from './Orders.module.scss';

export const Orders: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortValue, setSortValue] = useState('name');
  const [sortType, setSortType] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, data, error, isError } = UseOrders({
    page,
    limit,
    selectedFilter,
    sortValue,
    sortType,
  });

  const { data: orders, totalPages } = data ?? {};

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
        {orders?.map((item: IOrder) => (
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
