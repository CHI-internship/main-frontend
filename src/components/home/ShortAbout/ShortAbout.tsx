import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import style from './ShortAbout.module.scss';

const ShortAbout: FC = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.element}>
        <Typography className={style.text}>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            KraudDonate
          </span>{' '}
          is an app that serves to help volunteers.
        </Typography>
        <Typography className={style.text}>
          Thanks to the forum volunteers can communicate with each other and
          discuss new problems. You can communicate directly with people and
          find out their needs.
        </Typography>
        <Typography className={style.link}>
          <Link to='about' className={style.link_text}>
            See more...
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ShortAbout;
