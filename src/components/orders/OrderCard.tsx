import { useNavigate } from 'react-router-dom'
import style from './OrderCard.module.scss'

interface IOrderCardProps {
    id: number
    title: string
    info: string
    process?: string
    img: string
}

export const OrderCard: React.FC<IOrderCardProps> =
    ({ id, title, info, img }: IOrderCardProps) => {
        const navigate = useNavigate()

        return (
            <div className={style.card} onClick={() => navigate(`/orders/${id}`)}>
                <div className={style.img} style={{ backgroundImage: `url(${img})` }}></div>
                <div className={style.title}>{title}</div>
                <div className={style.info}>{info}</div>
                <div className={style.process}></div>
            </div>
        )
    }