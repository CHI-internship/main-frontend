import { axiosInstance } from './axios-instance';

class OrderService {
  async getOrders(limit = 10, page = 1, sort = 'asc') {
    return await axiosInstance
      .get('orders', { params: { limit, page, sort } })
      .then(data => data.data)
      .catch(() => []);
  }
}

const orderService = new OrderService();
export default orderService;
