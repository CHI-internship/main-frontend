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

  async updateOrder(id:number,data:any) {
    return await axiosInstance
      .patch(`orders/${id}`, data)
      .then(value => value.data)
  }
}

const orderService = new OrderService();
export default orderService;
