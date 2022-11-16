import { FC } from 'react';
import ShortAbout from '../components/home/ShortAbout/ShortAbout';
import { Box, Typography } from '@mui/material';
import GetStarted from '../components/home/GetStarted/GetStarted';
import OrderList from '../components/home/OrderList/OrderList';
import LastReports from '../components/home/LastReports/LastReports';

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
