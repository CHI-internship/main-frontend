import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import orderService from '../../api/orders.service';
import { OrderDetails } from '../../components/orders';
import { IOrder } from '../../types';


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
    <OrderDetails order={order} />
  );
};
export default Order;