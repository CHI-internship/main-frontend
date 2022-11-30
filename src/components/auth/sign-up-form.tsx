
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FormikValues, useFormik } from 'formik';
import { FC, useContext, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { userService } from '../../api';
import { CurrentUserContext } from '../../context';
import { formStyles, inputStyles } from '../../styles';
import { IUser } from '../../types';
import ErrorAlert from '../ErrorAlert/ErrorAlert';


const SignUpForm: FC = () => {
  const { setUser } = useContext(CurrentUserContext)
  const [error, setError] = useState(null as AxiosError);
  const { executeRecaptcha } = useGoogleReCaptcha()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '', name: '', lastname: '',
      password: '', confirmPassword: ''
    },
    onSubmit: async (values, formikHelpers) => {
      await signUp(values)
      formikHelpers.resetForm()
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid format').required('Email is required'),
      name: yup.string().required('Name is required'),
      lastname: yup.string().required('Lastname is required'),
      password: yup.string().min(8)
        .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          'Password must contain 0-9 & A-Z & a-z & any special symbol')
        .required('Password is required'),
      confirmPassword: yup.string().min(8)
        .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          'Password must contain 0-9 & A-Z & a-z & any special symbol')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    })
  })

  const signUp = async (values: FormikValues) => {
    const recaptchaToken = await executeRecaptcha('action')
    userService.signUp({
      email: values.email,
      name: values.name,
      lastname: values.lastname,
      password: values.password,
      recaptchaToken
    }).catch(err => setError(err))
      .then(() => {
        userService.retrieve(localStorage.getItem('token'))
          .then((data: IUser) => setUser(data))
        navigate('/profile', { replace: true })
      })
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {error && <ErrorAlert error={error} />}
      <Box sx={formStyles}>
        <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Sign Up
        </Typography>

        <form onSubmit={formik.handleSubmit}
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <TextField
            name='email'
            type='email'
            style={inputStyles.default}
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='name'
            style={inputStyles.default}
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='lastname'
            style={inputStyles.default}
            label='Lastname'
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.lastname && formik.errors.lastname}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            name='password'
            type='password'
            style={inputStyles.default}
            label='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='confirmPassword'
            type='password'
            style={inputStyles.default}
            label='Confirm password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <Button type='submit' variant='contained' sx={{ margin: '1rem 0 1rem 0' }}
            disabled={!formik.isValid || !formik.dirty}>
            Sign up
          </Button>
        </form>
      </Box>
    </Box >
  );
};

export default SignUpForm;
