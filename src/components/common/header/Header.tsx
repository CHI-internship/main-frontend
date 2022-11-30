import { AppBar, Toolbar, Typography } from '@mui/material';

import logo from '../../../images/Logo.svg'
import style from './Header.module.scss';
import { HeaderInfo } from './HeaderInfo';

export const Header: React.FC = () => (
  <AppBar position='static' color='primary'>
    <Toolbar className={style.toolbar}>
      <div className={style.logo}>
        <img src={logo} alt='logo' />
        <Typography variant='h5' sx={{ flexGrow: 1 }}>
          KraudDonate
        </Typography>
      </div>
      <HeaderInfo />
    </Toolbar>
  </AppBar>
)