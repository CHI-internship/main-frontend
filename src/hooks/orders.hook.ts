import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { orderService } from '../api';
import { IGetOrdersHookConfig, IOrder, IOrderResponse } from '../types';

export const UseOrders = (config: IGetOrdersHookConfig) => {
  const requestParams = {
    page: config.page,
    limit: config.limit,
    status: config.selectedFilter,
    sortBy: config.sortValue,
    sort: config.sortType,
  };

  return useQuery<IOrderResponse, AxiosError>(
    ['orders', requestParams],
    async () => {
      return orderService.getOrders(requestParams);
    },
    {
      cacheTime: 20000,
      keepPreviousData: true,
    }
  );
};
