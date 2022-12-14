import { Box, Typography } from '@mui/material';
import { FC } from 'react';

import { GetStarted, LastReports, OrderList, ShortAbout } from '../components/home';

const Home: FC = () => {
  return (
    <>
      <ShortAbout />
      <Box sx={{ margin: '1rem 0 0 0' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            borderBottom: '1px solid black',
          }}
        >
          Most Popular
        </Typography>
        <OrderList />
      </Box>
      <Box sx={{ margin: '1rem 0 0 0' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            borderBottom: '1px solid black',
          }}
        >
          Do you want to create your project?
        </Typography>
        <GetStarted />
      </Box>
      <Box sx={{ margin: '1rem 0 0 0' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            borderBottom: '1px solid black',
          }}
        >
          Last reports
        </Typography>
        <LastReports />
      </Box>
    </>
  );
};

export default Home;
