import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Field, Form, Formik, FormikValues } from 'formik';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import userService from '../../api/user.service';
import { formStyles, inputStyles } from '../../styles';
import { SignInType } from '../../types/auth.types';
import { recaptchaVerify } from '../../utils';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import FormLink from './form-link';

const initialValues: SignInType = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm: FC = () => {
  const [isError, setIsError] = useState(false);
  const [disableSend, setDisableSend] = useState(false)
  const [error] = useState(null as AxiosError);
  const navigate = useNavigate();

  const signIn = async (values: FormikValues) => {
    const recaptchaToken = await recaptchaVerify()
    const res = await userService
      .signIn({
        email: values.email,
        password: values.password,
        recaptchaToken
      })
      .catch(err => console.log(err));
    if (res) {
      setIsError(false);
      navigate('/profile', { replace: true });
    } else {
      setIsError(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {error && <ErrorAlert error={error} />}
      <Box sx={formStyles}>
        <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Sign In
        </Typography>

        {isError && <Alert severity='error'>Wrong email or password</Alert>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, formikHelpers) => {
            setDisableSend(true)
            await signIn(values).finally(() => setDisableSend(false))
            formikHelpers.resetForm();
          }}
        >
          {({ errors, touched, isValid, dirty }) => {
            return (
              <Form
                style={{
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
                  disabled={!isValid || !dirty || disableSend}
                >
                  Sign in
                </Button>

                <FormLink
                  path='/recover-password'
                  title='Forgot password'
                  styles={{ fontSize: '.75rem' }}
                />
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignInForm;