import { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { HeaderInfo } from './HeaderInfo';


const Header: FC = () => (
  <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography variant='h5' sx={{ flexGrow: 1 }}>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>
          KraudDonate
        </Typography>
      </Typography>
      <HeaderInfo />
    </Toolbar>
  </AppBar>
);

export default Header;
