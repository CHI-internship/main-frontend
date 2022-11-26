import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FC, useState, useContext } from 'react';
import { Formik, Form, Field, FormikValues } from 'formik';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import FormLink from './form-link';
import { userService } from '../../api';
import { formStyles, inputStyles } from '../../styles';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import { IUser, SignInType } from '../../types';
import { CurrentUserContext } from '../../context';


const initialValues: SignInType = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm: FC = () => {
  const { setUser } = useContext(CurrentUserContext)
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null as AxiosError);

  const navigate = useNavigate();

  const signIn = async (values: FormikValues) => {
    await userService
      .signIn({ email: values.email, password: values.password })
      .catch(err => {
        if (typeof err === 'string') {
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        } else {
          setError(err);
        }
      })
      .then(() => {
        setIsError(false)
        userService.retrieve(localStorage.getItem('token'))
          .then((data: IUser) => setUser(data))
        navigate('/profile', { replace: true })
      })
  };

  return (
    <>
      {error && <ErrorAlert error={error} />}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={formStyles}>
          <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
            Sign In
          </Typography>

          {isError && <Alert severity='error'>Wrong email or password</Alert>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, formikHelpers) => {
              await signIn(values);
              formikHelpers.resetForm();
            }}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              >
                <Field
                  name='email'
                  type='email'
                  as={TextField}
                  required
                  style={inputStyles.default}
                  label='Email'
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
                />
                <Field
                  name='password'
                  type='password'
                  as={TextField}
                  required
                  style={inputStyles.default}
                  label='Password'
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />

                <FormLink path='/sign-up' title='Sign Up' />

                <Button
                  type='submit'
                  variant='contained'
                  sx={{ margin: '1rem 0 1rem 0' }}
                  disabled={!isValid || !dirty}
                >
                  Sign in
                </Button>

                <FormLink
                  path='/recover-password'
                  title='Forgot password'
                  styles={{ fontSize: '.75rem' }}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
