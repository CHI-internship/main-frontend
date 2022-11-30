import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { orderService } from '../../../api';
import { CurrentUserContext } from '../../../context';
import { IOrder } from '../../../types';
import { ProgressBar } from '../../common';
import UpdateOrder from '../UpdateOrder/UpdateOrder';
import style from './OrderDetails.module.scss';


interface IOrderCardProps {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
  id: number;
}

const OrderDetails: FC<IOrderCardProps> = ({ order, setOrder, id }) => {
  const { user } = useContext(CurrentUserContext)
  const [orderDb, setOrderDb] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUser = async () => {
    if (user?.role === 'volunteer') {
      const orderFromDB = await orderService.getUserOrder(id);
      if (orderFromDB) {
        setOrderDb(true);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    } else {
      navigate('/sign-in');
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>{order?.title}</h1>
        <p>{order?.info}</p>
      </div>
      <div className={style.main}>
        <div className={style.image}
          style={{ backgroundImage: `url(${order?.photo})` }}>
        </div>
        <div className={style.content}>
          <div className={style.content_header}>
            <div className=
              {order?.status === 'open' ?
                style.gathering_open : style.gathering_close}>
              <h4>{order?.status === 'open' ? 'Відкритий збір' : 'Збір закрито'}</h4>
            </div>
            <IconButton
              style={{ display: orderDb ? 'block' : 'none' }}
              onClick={handleOpen}
            >
              <EditIcon />
            </IconButton>
          </div>
          <ProgressBar moneyHave={order?.sum} moneyNeed={order?.goal_amount}
            closedAt={new Date(order?.finished_at)} size='large' />
          <p>{order?.short_info}</p>
          <button className={style.gather_button}>Підтримати</button>
        </div>
      </div>
      <UpdateOrder open={open} handleClose={handleClose} order={order} setOrder={setOrder} />
    </div>
  );
};

export default OrderDetails;