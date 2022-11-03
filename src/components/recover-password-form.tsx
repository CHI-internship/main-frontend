import { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../styles/input-styles';
import { validateEmail } from '../utils/validate-email';

const RecoverPasswordForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const isValid = (): boolean => {
    if (validateEmail(email)) {
      setEmail('');
      setIsEmailError(false);
      return true;
    } else {
      setIsEmailError(true);
      return false;
    }
  };

  const recoverPassword = (): void => {
    if (isValid()) {
      alert('Recovered');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '.75rem 2rem .75rem 2rem',
        }}
      >
        <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Recover Password
        </Typography>

        <TextField
          style={inputStyles.default}
          label='Email'
          required
          error={isEmailError}
          helperText={isEmailError ? 'Wrong email format' : ''}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          variant='contained'
          sx={{ margin: '1rem 0 1rem 0' }}
          onClick={() => recoverPassword()}
        >
          Recover Password
        </Button>
      </Box>
    </Box>
  );
};

export default RecoverPasswordForm;
