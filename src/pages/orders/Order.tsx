import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import orderService from '../../api/orders.service';
import { IOrder } from '../../types';
import OrderDetails from '../../components/orders/OrderDetails/OrderDetails';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';

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
      <OrderDetails order={order} setOrder={setOrder} id={+id} />
    </>
  );
};
export default Order;
