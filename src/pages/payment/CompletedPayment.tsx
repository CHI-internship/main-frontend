import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import catPhoto from '../../images/cat.jpg'
import style from './CompletedPayment.module.scss'


export const CompletedPayment: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={style.container}>
            Thank you! The payment is successful!
            <img src={catPhoto} className={style.image} />
            <Button variant='outlined'
                onClick={() => navigate('/orders', { replace: true })}>
                Go to orders
            </Button>
        </div>
    )
}
