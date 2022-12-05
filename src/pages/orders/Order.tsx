import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { orderService } from '../../api';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { OrderDetails } from '../../components/orders';
import { IOrder } from '../../types';

const Order: FC = () => {
  const [error, setError] = useState(null as AxiosError);
  const [order, setOrder] = useState<IOrder>();
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
      <OrderDetails order={order} setOrder={setOrder} />
    </>
  );
};
export default Order;
