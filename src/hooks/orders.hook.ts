import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { IGetOrdersHookConfig, IOrder } from '../types';

export const UseOrders = (config: IGetOrdersHookConfig, fn: Function) => {
  const { page, limit, selectedFilter, sortValue, sortType } = config;

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
      const orders = await fn({
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

  return { isLoading, orders, error, isError };
};
