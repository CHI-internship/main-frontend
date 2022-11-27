import { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { HeaderInfo } from './HeaderInfo';
import logo from '../../../images/Logo.svg'
import style from './Header.module.scss'

const Header: FC = () => (
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
);

export default Header;
