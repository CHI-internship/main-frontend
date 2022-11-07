import style from './Order.module.scss'

interface IOrderProps {
  id: number
  title: string
  info: string
}

export const Order: React.FC<IOrderProps> =
  ({ id, title, info }: IOrderProps) => {
    return (
      <div className={style.order}>
        <div className={style.title}>{title}</div>
        <div className={style.info}>{info}</div>
      </div>
    )
  }