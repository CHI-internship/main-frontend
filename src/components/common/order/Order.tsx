import style from './Order.module.scss'

interface IOrderProps {
  id: number
  title: string
  info: string
}

export default function Order({ title, info }: IOrderProps) {
  return (
    <div className={style.order}>
      <div className={style.title}>{title}</div>
      <div className={style.info}>{info}</div>
    </div>
  )
}
