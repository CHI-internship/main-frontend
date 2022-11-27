import { IOrderDto } from '../types/order.types';
import { axiosInstance } from './axios-instance';
import { AxiosError, AxiosResponse } from 'axios';

class OrderService {
  async getOrders(page = 1, limit = 10, sort = 'asc') {
    return axiosInstance
      .get('orders', { params: { limit, page, sort } })
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

  async createOrder(orderDto: IOrderDto) {
    return axiosInstance.post('orders', orderDto)
      .then(value => value.data).catch(() => false)
  }

}

const orderService = new OrderService();
export default orderService;
