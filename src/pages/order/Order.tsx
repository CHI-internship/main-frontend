import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import orderService from '../../api/orders.service';
import { IOrder } from '../../types/order.types';
import OrderDetails from '../../components/orders/OrderDetails/OrderDetails';

const Order: FC = () => {

  const [order, setOrder] = useState<IOrder>();
  const { state } = useLocation();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (state) {
      setOrder(state);
    } else {
      orderService.getOrderById(id).then(value => setOrder(value));
    }
  }, []);

  return (
    <OrderDetails order={order} setOrder={setOrder}/>
  );
};
export default Order;