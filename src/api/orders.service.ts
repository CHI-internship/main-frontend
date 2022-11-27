import { axiosInstance } from './axios-instance';
import { AxiosError, AxiosResponse } from 'axios';

class OrderService {
  async getOrders(page = 1, limit = 10, sort = 'asc') {
    return await axiosInstance
      .get('orders', { params: { limit, page, sort } })
      .then((data: AxiosResponse) => data.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async getOrderById(id: string) {
    return await axiosInstance
      .get(`orders/${id}`)
      .then((value: AxiosResponse) => value.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async updateOrder(id:number,data:any) {
    return await axiosInstance
      .patch(`orders/${id}`, data)
      .then(value => value.data)
  }

  async getUserOrder(id: number, userId: number) {
    return await axiosInstance
      .get(`orders/${id}/${userId}`)
      .then(value => value.data)
      .catch(() => []);
  }
}

const orderService = new OrderService();
export default orderService;
