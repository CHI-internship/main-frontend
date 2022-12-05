import { Box, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import orderService from '../../../api/orders.service';
import { IOrder } from '../../../types';
import ErrorAlert from '../../ErrorAlert/ErrorAlert';
import { OrderCard } from '../../orders';
import style from './OrderList.module.scss';

const OrderList: FC = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null as AxiosError);

  const getOrders = async () => {
    await orderService
      .getOrders(1, 3)
      .then((data: AxiosResponse) => setOrders(data.data))
      .catch(err => {
        setError(err);
        setOrders([]);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box>
      {error && <ErrorAlert error={error} />}
      <Box className={style.orderList}>
        {orders?.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </Box>
      <Box>
        <Typography className={style.link}>
          <Link to='projects' className={style.link_text}>
            See more...
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderList;
