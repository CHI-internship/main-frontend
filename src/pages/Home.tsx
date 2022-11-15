import { FC } from 'react';
import ShortAbout from '../components/home/ShortAbout';
import { Box, Button, Typography } from '@mui/material';
import GetStarted from '../components/home/GetStarted';

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
    </>
  );
};

export default Home;
