import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './GetStarted.module.scss';

const GetStarted: FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/sign-up');

  return (
    <Box className={style.wrapper}>
      <Box className={style.modalContent}>
        <Box className={style.text}>
          <Box>
            <Typography sx={{ fontSize: '1.25rem' }}>
              You need to do a few simple steps:
            </Typography>
            <Box sx={{ margin: '.5rem 0 0 0' }}>
              <Typography>1. Sign up</Typography>
              <Typography>2. Start to be volunteer</Typography>
              <Typography>- verify your person(add passport photo)</Typography>
              <Typography>- add your payment methods</Typography>
              <Typography>4. Create your project</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '.5rem 0 0 0',
          }}
        >
          <Button variant='contained' onClick={handleGetStarted}>
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GetStarted;
