import React, { FC } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Header: FC = () => {

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography
            variant='h5'
            sx={{ flexGrow: 1 }}>
            KraudDonate
          </Typography>

          <Box className={'profile_container'}>

            <IconButton
              sx={{ padding:0}}
              color='inherit'>
              <PermIdentityIcon />
            </IconButton>

            <Box className={'avatar'}>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4OPBibmFcA0jgIPbN-6wPiy37vbmfQN7SAg&usqp=CAU'
                alt='avatar' />
            </Box>

            <p>TM</p>

          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;