import { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../../styles/input-styles';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field, FormikValues } from 'formik';

type SignUpType = {
  email: string;
  name: string;
  lastname: string;
  photo?: string;
  password: string;
  confirmPassword: string;
};

const initialValues: SignUpType = {
  email: '',
  name: '',
  lastname: '',
  photo: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
  name: yup.string().required('Name is required'),
  lastname: yup.string().required('Lastname is required'),
  photo: yup
    .string()
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, 'Must be URL'),
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
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain 0-9 & A-Z & a-z & any special symbol'
    )
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpForm: FC = () => {
  const navigate = useNavigate();

  const signUp = (values: FormikValues) => {
    console.log(values);
    navigate('/', { replace: true });
  };

  return (
    <Box>
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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) => {
              signUp(values);
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
                    name='photo'
                    type='photo'
                    as={TextField}
                    style={inputStyles.default}
                    label='Photo'
                    error={Boolean(errors.photo) && Boolean(touched.photo)}
                    helperText={Boolean(touched.photo) && errors.photo}
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
