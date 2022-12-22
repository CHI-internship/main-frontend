import orderService from '../api/orders.service';
import { IGetOrdersConfig } from '../types';

export const getOrders = async (
  config: IGetOrdersConfig,
  setTotalPages: Function
) => {
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
