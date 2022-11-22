import { axiosInstance } from './axios-instance';
import { AxiosError, AxiosResponse } from 'axios';

class OrderService {
  async getOrders(limit = 10, page = 1) {
    return await axiosInstance
      .get('orders', { params: { limit, page } })
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
}

const orderService = new OrderService();
export default orderService;
