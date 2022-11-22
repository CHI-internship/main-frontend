import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import orderService from '../../api/orders.service';
import { IOrder } from '../../types';
import OrderDetails from '../../components/orders/OrderDetails/OrderDetails';

const Order: FC = () => {

  const [order, setOrder] = useState<IOrder>();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    orderService.getOrderById(id).then(value => setOrder(value));
  }, []);

  return (
    <OrderDetails order={order} setOrder={setOrder} id={+id}/>
  );
};
export default Order;