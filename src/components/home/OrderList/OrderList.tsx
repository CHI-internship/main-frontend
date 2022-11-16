import { FC, useEffect, useState } from 'react';
import orderService from '../../../api/orders.service';
import { IOrder } from '../../../types/order.types';
import { OrderCard } from '../../orders/OrderCard';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import style from './OrderList.module.scss';

const OrderList: FC = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await orderService.getOrders(3).then((data: any) => setOrders(data.data));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box>
      <Box className={style.orderList}>
        {orders.map((item: IOrder) => (
          <OrderCard key={item.id} order={item} />
        ))}
      </Box>
      <Box>
        <Typography className={style.link}>
          <Link to='orders' className={style.link_text}>
            See more...
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderList;
