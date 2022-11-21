import { IOrderDto } from '../types/order.types';
import { axiosInstance } from './axios-instance';

class OrderService {
  async getOrders(limit = 10, page = 1) {
    return await axiosInstance
      .get('orders', { params: { limit, page } })
      .then(data => data.data)
      .catch(() => []);
  }

  async getOrderById(id: string) {
    return await axiosInstance
      .get(`orders/${id}`)
      .then(value => value.data)
      .catch(() => []);
  }

  async createOrder(orderDto: IOrderDto) {
    return await axiosInstance.post('orders', orderDto)
      .then(value => value.data).catch(() => false)
  }

}

const orderService = new OrderService();
export default orderService;
