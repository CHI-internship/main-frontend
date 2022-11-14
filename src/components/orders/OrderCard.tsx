import { Link } from 'react-router-dom'
import { IOrder } from '../../types/order.types'
import style from './OrderCard.module.scss'

interface IOrderCardProps {
    order: IOrder
}

export const OrderCard: React.FC<IOrderCardProps> =
    ({ order }: IOrderCardProps) => {

        return (
            <Link to={String(order.id)} state={order}>
                <div className={style.card}>
                    <div className={style.img}
                        style={{ backgroundImage: `url(${order.photo})` }}></div>
                    <div className={style.title}>{order.title}</div>
                    <div className={style.info}>{order.info}</div>
                    <div className={style.process}></div>
                </div>
            </Link >
        )
    }