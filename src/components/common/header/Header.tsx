import { AppBar, Toolbar, Typography } from '@mui/material';
import { HeaderInfo } from './HeaderInfo';

export const Header: React.FC = () => (
  <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography variant='h5' sx={{ flexGrow: 1 }}>
        KraudDonate
      </Typography>
      <HeaderInfo />
    </Toolbar>
  </AppBar>
)