import React, { FC, ReactElement } from 'react';
import { Typography } from '@mui/material';

const NoMatchPage: FC<{}> = (): ReactElement => {
  return (
    <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
      Page Not Found
    </Typography>
  );
};

export default NoMatchPage;
