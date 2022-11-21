import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import orderService from '../../api/orders.service';
import { IOrder } from '../../types/order.types';
import OrderDetails from '../../components/orders/OrderDetails/OrderDetails';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';

const Order: FC = () => {
  const [error, setError] = useState<AxiosError>(undefined);

  const [order, setOrder] = useState<IOrder>();
  const { state } = useLocation();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then(value => setOrder(value))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {error && <ErrorAlert error={error} />}
      <OrderDetails order={order} />
    </>
  );
};
export default Order;
