import EditIcon from '@mui/icons-material/Edit';
import { IconButton, MenuItem, Select, TextField } from '@mui/material';
import cn from 'classnames';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';

import { CurrentUserContext } from '../../../context';
import { IOrder, IPaymentPayload, PaymentCurrency } from '../../../types';
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
  const [currency, setCurrency] = useState<PaymentCurrency>(PaymentCurrency.UAH);
  const [paymentPayload, setPaymentPayload] = useState<IPaymentPayload>()

  const submitPayment = () => {
    if (amount && order?.title && order?.id) {
      setPaymentPayload(
        { amount, currency, description: order?.title, order_id: order?.id })
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
                  <TextField
                    id='amount'
                    type='number'
                    size='small'
                    sx={{ width: '100px' }}
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                  <Select
                    id='donateAmount'
                    label='Currency'
                    size='small'
                    defaultValue={PaymentCurrency.UAH}
                    onChange={(e) => setCurrency(e.target.value as PaymentCurrency)}
                  >
                    <MenuItem value={PaymentCurrency.UAH}>{PaymentCurrency.UAH}</MenuItem>
                    <MenuItem value={PaymentCurrency.USD}>{PaymentCurrency.USD}</MenuItem>
                    <MenuItem value={PaymentCurrency.EUR}>{PaymentCurrency.EUR}</MenuItem>
                  </Select>
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