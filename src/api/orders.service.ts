import { axiosInstance } from "./axios-instance";

class OrderService {
    async getOrders() {
        return await axiosInstance.get('orders')
            .then(data => data.data).catch(() => [])
    }
}

const orderService = new OrderService()
export default orderService