import { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../../styles/input-styles';
import formStyles from '../../styles/form-styles';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field, FormikValues } from 'formik';
import { SignUpType } from '../../types/auth.types';
import userService from '../../api/user.service';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { recaptchaVerify } from '../../utils/recaptcha';

const initialValues: SignUpType = {
  email: '',
  name: '',
  lastname: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
  name: yup.string().required('Name is required'),
  lastname: yup.string().required('Lastname is required'),
  password: yup
    .string()
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain 0-9 & A-Z & a-z & any special symbol'
    )
    .min(8)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha()

  const signUp = async (values: FormikValues) => {
    const recaptchaToken = await recaptchaVerify(executeRecaptcha)
    const res = await userService
      .signUp({
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        password: values.password,
        recaptchaToken
      })
      .catch(err => console.log(err));
    if (res) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={formStyles}>
          <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
            Sign Up
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, formikHelpers) => {
              await signUp(values);
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
                    name='name'
                    type='name'
                    as={TextField}
                    required
                    style={inputStyles.default}
                    label='Name'
                    error={Boolean(errors.name) && Boolean(touched.name)}
                    helperText={Boolean(touched.name) && errors.name}
                  />
                  <Field
                    name='lastname'
                    type='lastname'
                    as={TextField}
                    required
                    style={inputStyles.default}
                    label='Lastname'
                    error={
                      Boolean(errors.lastname) && Boolean(touched.lastname)
                    }
                    helperText={Boolean(touched.lastname) && errors.lastname}
                  />
                  <Field
                    name='password'
                    type='password'
                    as={TextField}
                    required
                    style={inputStyles.default}
                    label='Password'
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />
                  <Field
                    name='confirmPassword'
                    type='password'
                    as={TextField}
                    required
                    style={inputStyles.default}
                    label='Confirm password'
                    error={
                      Boolean(errors.confirmPassword) &&
                      Boolean(touched.confirmPassword)
                    }
                    helperText={
                      Boolean(touched.confirmPassword) && errors.confirmPassword
                    }
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ margin: '1rem 0 1rem 0' }}
                    disabled={!isValid || !dirty}
                  >
                    Sign up
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpForm;
