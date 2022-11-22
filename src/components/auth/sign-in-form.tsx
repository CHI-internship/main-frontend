import * as yup from 'yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FC, useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import inputStyles from '../../styles/input-styles';
import formStyles from '../../styles/form-styles';
import FormLink from './form-link';
import { Formik, Form, Field, FormikValues } from 'formik';
import { SignInType } from '../../types/auth.types';
import userService from '../../api/user.service';
import { useNavigate } from 'react-router-dom';
import { recaptchaVerify } from '../../utils/recaptcha';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const initialValues: SignInType = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
  password: yup
    .string()
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain 0-9 & A-Z & a-z & any special symbol'
    )
    .min(8)
    .required('Password is required'),
});

const SignInForm: FC = () => {
  const [isError, setIsError] = useState(false);
  const [disableSend, setDisableSend] = useState(false)
  const [error, setError] = useState(null as AxiosError);
  const { executeRecaptcha } = useGoogleReCaptcha()
  const navigate = useNavigate();

  const signIn = async (values: FormikValues) => {
    const recaptchaToken = await recaptchaVerify(executeRecaptcha)
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

        {isError ? (
          <Alert severity='error'>Wrong email or password</Alert>
        ) : null}

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