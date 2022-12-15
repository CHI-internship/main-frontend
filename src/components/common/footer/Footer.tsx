import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Link,Typography } from '@mui/material';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'silver',
        padding: '0.5rem 1rem 0 1rem',
        marginTop: 'auto',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link href='#'>
            <FacebookIcon sx={{ color: 'black' }} />
          </Link>
          <Link href='#'>
            <InstagramIcon sx={{ color: 'black' }} />
          </Link>
          <Link href='#'>
            <TwitterIcon sx={{ color: 'black' }} />
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '1rem 0 0 0',
          }}
        >
          <Box>
            <CopyrightIcon />
          </Box>
          <Box>
            <Typography>2022 KraudDonate, Ukraine</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
