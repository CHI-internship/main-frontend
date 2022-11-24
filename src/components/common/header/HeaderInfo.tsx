import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Header.module.scss';
import userService from '../../../api/user.service';

interface IHeaderInfoProps {
    defaultAvatar?: string
}

export const HeaderInfo: React.FC<IHeaderInfoProps> = ({ defaultAvatar }) => {
    const [authorized, setAuthorized] = useState(false)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            userService.retrieve(token).then(data => {
                setAvatar(data.photo)
                setName(data.name)
                setAuthorized(true)
            })
        }
    }, [])

    return (
        <div className={style.profile_container}>
            {authorized
                ? <Button onClick={() => navigate('/profile')}>
                    <div className={style.avatar}
                        style={{ backgroundImage: `url(${avatar ?? defaultAvatar})` }}></div>
                    <div className={style.name}>{name && name}</div>
                </Button>
                : <div>
                    <Button variant='text' size='small' onClick={() => navigate('/sign-in')}
                        sx={{ color: '#fff', textTransform: 'capitalize' }}>
                        Sing in
                    </Button>
                    <Button variant='text' size='small' onClick={() => navigate('/sign-up')}
                        sx={{ color: '#fff', textTransform: 'capitalize', border: '1px solid #fff' }}>
                        Sing up
                    </Button>
                </div>}
        </div >
    )
}

HeaderInfo.defaultProps = {
    defaultAvatar: 'https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg'
}