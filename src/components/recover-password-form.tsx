import { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../styles/input-styles';
import * as yup from 'yup';
import { Formik, Form, Field, FormikValues } from 'formik';

type RecoverPasswordType = {
  email: string;
};

const initialValues: RecoverPasswordType = {
  email: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
});

const RecoverPasswordForm: FC = () => {
  const recoverPassword = (values: FormikValues) => {
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
          Recover Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
            recoverPassword(values);
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

                <Button
                  type='submit'
                  variant='contained'
                  sx={{ margin: '1rem 0 1rem 0' }}
                  disabled={!isValid || !dirty}
                >
                  Recover Password
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default RecoverPasswordForm;
