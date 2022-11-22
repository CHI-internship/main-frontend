import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UpdateOrder from '../UpdateOrder/UpdateOrder';
import style from './OrderDetails.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import userService from '../../../api/user.service';
import { IOrder, IUser } from '../../../types';
import { ProgressBar } from '../../common';

interface IOrderCardProps {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
  id: number;
}

const OrderDetails: FC<IOrderCardProps> = ({ order, setOrder, id }) => {

  const [user, setUser] = useState<IUser>();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const getUser = async () => {
    const userFromDb = await userService.retrieve(localStorage.getItem('token'));
    if (userFromDb.role === 'volunteer') {
      const orderFromDB = userFromDb.orders.find((order: IOrder) => order.id === id);
      if (orderFromDB) {
        setUser(userFromDb);
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
              style={{ display: user ? 'block' : 'none' }}
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