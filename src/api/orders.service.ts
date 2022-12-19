import { AxiosError, AxiosResponse } from 'axios';

import { IOrderDto } from '../types';
import { axiosInstance } from './axios-instance';

interface IGetOrdersConfig {
  page: number;
  limit: number;
  sort?: string;
  status?: string;
}

class OrderService {
  async getOrders(config: IGetOrdersConfig) {
    return axiosInstance
      .get('orders', {
        params: {
          page: config.page,
          limit: config.limit,
          sort: config.sort,
          status: config.status,
        },
      })
      .then((data: AxiosResponse) => data.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async getSortOrders(page = 1, sortBy: string, sort = 'asc', limit = 10) {
    return axiosInstance
      .get('orders/sorted', { params: { limit, page, sort, sortBy } })
      .then((data: AxiosResponse) => data.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async getOrderById(id: string) {
    return axiosInstance
      .get(`orders/${id}`)
      .then((value: AxiosResponse) => value.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async updateOrder(id: number, data: any) {
    return axiosInstance
      .patch(`orders/${id}`, data)
      .then((value) => value.data);
  }

  async createOrder(orderDto: IOrderDto) {
    return axiosInstance
      .post('orders', orderDto)
      .then((value) => value.data)
      .catch(() => false);
  }

  async getUserOrder(id: number) {
    return axiosInstance
      .get(`orders/${id}/ownership}`)
      .then((value) => value.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }
}

const orderService = new OrderService();
export default orderService;
