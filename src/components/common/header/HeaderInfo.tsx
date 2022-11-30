import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../../context';
import { logoutIcon } from '../../../images'
import style from './Header.module.scss';

interface IHeaderInfoProps {
    defaultAvatar?: string
}

export const HeaderInfo: React.FC<IHeaderInfoProps> = ({ defaultAvatar }) => {
    const { user, setUser } = useContext(CurrentUserContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/sign-in')
    }

    const signup = () => {
        localStorage.removeItem('token')
        navigate('/sign-up')
    }

    return (
        <div>
            {user ?
                (
                    <div>
                        <Button onClick={() => navigate('/profile')}>
                            <div className={style.avatar}
                                style={{ backgroundImage: `url(${user?.photo ?? defaultAvatar})` }}>
                            </div>
                            <div className={style.name}>{user?.name}</div>
                        </Button>
                        <Button onClick={logout} sx={{ padding: '0', margin: '0 -10px' }}>
                            <img src={logoutIcon} className={style.logoutIcon} />
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button variant='text' size='small' onClick={logout}
                            sx={{ color: '#fff', textTransform: 'capitalize' }}>
                            Sing in
                        </Button>
                        <Button variant='text' size='small'
                            onClick={signup}
                            sx={{
                                color: '#fff', textTransform: 'capitalize', border: '1px solid #fff'
                            }}>
                            Sing up
                        </Button>
                    </div>
                )
            }
        </div >
    )
}

HeaderInfo.defaultProps = {
    defaultAvatar: 'https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg'
}