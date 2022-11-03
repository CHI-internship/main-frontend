import { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../styles/input-styles';
import FormLink from './form-link';
import { validateEmail } from '../utils/validate-email';
import { validatePassword } from '../utils/valdiate-password';

const SignInForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const isValid = (): boolean => {
    if (validateEmail(email)) {
      if (validatePassword(password)) {
        setEmail('');
        setPassword('');
        setIsEmailError(false);
        setIsPasswordError(false);
        return true;
      } else {
        setIsPasswordError(true);
        return false;
      }
    } else {
      setIsEmailError(true);
      return false;
    }
  };

  const signIn = (): void => {
    if (isValid()) {
      alert('Signed In');
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
          Sign In
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
        <TextField
          style={inputStyles.default}
          label='Password'
          required
          type='password'
          error={isPasswordError}
          helperText={
            isPasswordError
              ? 'Password must contain 0-9 & A-Z & a-z & any special symbol'
              : ''
          }
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <FormLink path='/sign-up' title='Sign Up' />

        <Button
          variant='contained'
          sx={{ margin: '1rem 0 1rem 0' }}
          onClick={() => signIn()}
        >
          Sign In
        </Button>

        <FormLink
          path='recover-password'
          title='Forgot password'
          styles={{ fontSize: '.75rem' }}
        />
      </Box>
    </Box>
  );
};

export default SignInForm;
