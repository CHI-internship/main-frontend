import { axiosInstance } from './axios-instance';

class OrderService {
  async getOrders() {
    return await axiosInstance.get('orders')
      .then(data => data.data).catch(() => [])
  }

  async getOrderById(id:string) {
    return await axiosInstance.get(`orders/${id}`)
      .then(value => value.data ).catch(() => [])
  }
}

const orderService = new OrderService()
export default orderService