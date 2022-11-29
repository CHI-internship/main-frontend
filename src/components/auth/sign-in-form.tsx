import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FormikValues, useFormik } from 'formik';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { userService } from '../../api';
import { CurrentUserContext } from '../../context';
import { formStyles, inputStyles } from '../../styles';
import { IUser } from '../../types';
import { recaptchaVerify } from '../../utils';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import FormLink from './form-link';



const SignInForm: FC = () => {
  const { setUser } = useContext(CurrentUserContext)
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null as AxiosError);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values, formikHelpers) => {
      await signIn(values)
      formikHelpers.resetForm()
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid format').required('Email is required'),
      password: yup.string().required('Password is required')
    })
  })

  const signIn = async (values: FormikValues) => {
    const recaptchaToken = await recaptchaVerify()
    userService.signIn({
      email: values.email,
      password: values.password,
      recaptchaToken
    })
      .catch(err => {
        if (typeof err === 'string') {
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        } else setError(err)
      })
      .then(() => {
        setIsError(false)
        userService.retrieve(localStorage.getItem('token'))
          .then((data: IUser) => setUser(data))
        navigate('/profile', { replace: true })
      })
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

        <form onSubmit={formik.handleSubmit} style={{ textAlign: 'center' }}>
          <TextField
            id='email'
            type='email'
            label='Email'
            style={inputStyles.default}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='password'
            label='Password'
            type='password'
            style={inputStyles.default}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <FormLink path='/sign-up' title='Sign Up' />
          <Button type='submit' variant='contained' sx={{ margin: '1rem 0 1rem 0' }}
            disabled={!formik.isValid || !formik.dirty}>
            Sign in
          </Button>
          <FormLink
            path='/recover-password'
            title='Forgot password'
            styles={{ fontSize: '.75rem' }} />
        </form>
      </Box >
    </Box >
  );
};

export default SignInForm;