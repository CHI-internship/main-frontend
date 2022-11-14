import { useEffect, useState } from 'react';
import orderService from '../../api/orders.service';
import { OrderCard } from '../../components/orders/OrderCard';
import style from './Orders.module.scss'


export const Orders: React.FC = () => {
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        await orderService.getOrders().then((data: any) => setOrders(data.data))
    }

    useEffect(() => { getOrders() }, [])
    return (
        <div className={style.orders}>
            {orders.map((item: any) => <OrderCard key={item.id} order={item} />)}
        </div>
    )
}
