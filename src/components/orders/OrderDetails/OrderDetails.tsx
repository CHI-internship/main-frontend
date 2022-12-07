import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TextField } from '@mui/material';
import cn from 'classnames';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';

import { CurrentUserContext } from '../../../context';
import { IOrder, IPaymentPayload } from '../../../types';
import { ProgressBar } from '../../common';
import { Payment } from '../../payment/Payment';
import UpdateOrder from '../UpdateOrder/UpdateOrder';
import style from './OrderDetails.module.scss';


interface IOrderCardProps {
  order: IOrder;
  setOrder: Dispatch<SetStateAction<IOrder>>;
}

const OrderDetails: FC<IOrderCardProps> = ({ order, setOrder }) => {
  const { user } = useContext(CurrentUserContext)
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentPayload, setPaymentPayload] = useState<IPaymentPayload>()

  const submitPayment = () => {
    if (amount >= 20 && order?.title && order?.id) {
      setPaymentPayload(
        { amount, currency: 'UAH', description: order?.title, orderId: order?.id })
      setPayment(true)
    }
  }

  const handleClose = () => setOpen(false);

  return (
    <div className={style.container}>
      {
        payment ?
          <Payment paymentPayload={paymentPayload} /> :
          <div>
            <ProgressBar
              size='large'
              moneyHave={order?.sum}
              moneyNeed={order?.goal_amount}
              closedAt={new Date(order?.finished_at)}
            />
            <div className={style.info}>
              <div className={style.image} style={{ backgroundImage: `url(${order?.photo})` }}>
                <span className={cn(style.status, { [style.gatheringOpen]: order?.status === 'open' })}>
                  {order?.status === 'open' ? 'Відкритий збір' : 'Збір закрито'}
                </span>
              </div>
              <div className={style.details}>
                <div>
                  <h1>{order?.title}</h1>
                  <p className={style.infoItem}>{order?.short_info}</p>
                </div>
                <div className={style.payment}>
                  <div className={style.minDonate}>Min donate: 20 UAH</div>
                  <TextField
                    id='amount'
                    type='number'
                    size='small'
                    sx={{ width: '100px' }}
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                  <button className={style.gatherButton} onClick={submitPayment}>
                    Підтримати
                  </button>
                </div>
              </div>
            </div>
            <p className={style.longInfo}>{order?.info}</p>
            {
              (user?.role === 'volunteer' && order?.user_id === user?.id) &&
              <div className={style.editing}>
                <UpdateOrder open={open} handleClose={handleClose}
                  order={order} setOrder={setOrder} />
                <IconButton onClick={() => setOpen(true)}>
                  <EditIcon />
                </IconButton>
              </div>
            }
          </div>
      }
    </div >
  );
};

export default OrderDetails;