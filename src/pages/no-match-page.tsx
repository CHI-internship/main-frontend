import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const NoMatchPage: FC<{}> = (): ReactElement => {
  return (
    <Typography sx={{ textAlign: 'center', fontSize: '3rem' }}>
      Page Not Found
    </Typography>
  );
};

export default NoMatchPage;
