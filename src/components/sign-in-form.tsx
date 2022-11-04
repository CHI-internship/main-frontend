import { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../styles/input-styles';
import FormLink from './form-link';
import * as yup from 'yup';
import { Formik, Form, Field, FormikValues } from 'formik';

type SignInType = {
  email: string;
  password: string;
};

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
  const signIn = (values: FormikValues) => {
    console.log(values);
    // navigate('/', { replace: true });
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
            signIn(values);
            formikHelpers.resetForm();
          }}
        >
          {({ values, errors, touched, isValid, dirty }) => {
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
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignInForm;
