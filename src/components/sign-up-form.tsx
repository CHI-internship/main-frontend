import { FC, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  AlertTitle,
} from '@mui/material';
import inputStyles from '../styles/input-styles';
import { validateEmail } from '../utils/validate-email';
import { validatePassword } from '../utils/valdiate-password';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  name: string;
  lastname: string;
  password: string;
  photo?: string;
};

const SignUpForm: FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const isValid = (): boolean => {
    if (validateEmail(email)) {
      setIsEmailError(false);
      if (validatePassword(password)) {
        setIsPasswordError(false);
        if (password === repeatPassword) {
          setEmail('');
          setPassword('');
          return true;
        } else {
          setIsPasswordsMatch(false);
          return false;
        }
      } else {
        setIsPasswordError(true);
        return false;
      }
    } else {
      setIsEmailError(true);
      return false;
    }
  };

  const signUp = (): void => {
    const user: User = {
      email,
      name,
      lastname,
      password,
      photo,
    };
    if (isValid()) {
      console.log(user);
      navigate('/sign-in', { replace: true });
    }
  };

  return (
    <Box>
      {!isPasswordsMatch ? (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Password not match
        </Alert>
      ) : null}
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
            Sign Up
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
            label='Name'
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            style={inputStyles.default}
            label='Lastname'
            required
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />

          <TextField
            style={inputStyles.default}
            label='Photo'
            required
            value={photo}
            onChange={e => setPhoto(e.target.value)}
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
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />

          <TextField
            style={inputStyles.default}
            label='Confirm password'
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

          <Button
            variant='contained'
            sx={{ margin: '1rem 0 1rem 0' }}
            onClick={() => signUp()}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
