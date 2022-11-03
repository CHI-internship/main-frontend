import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import logo from '../images/user.png';
import style from './Header.module.scss';

const Header = () => {

  return (

    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography
          variant='h5'
          sx={{ flexGrow: 1 }}
        >
            KraudDonate
        </Typography>

        <Box className={style.profile_container}>

          <IconButton
            sx={{ padding: 0 }}
            color='inherit'
          >
            <PermIdentityIcon />
          </IconButton>

          <Box className={style.avatar}>
            <img
              src={logo}
              alt='avatar'
            />
          </Box>

          <p>TM</p>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;