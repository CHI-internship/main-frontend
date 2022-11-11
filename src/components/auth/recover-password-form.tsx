import * as yup from 'yup';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import inputStyles from '../../styles/input-styles';
import { Formik, Form, Field } from 'formik';
import userService from '../../api/user.service';
import { recaptchaVerify } from '../../utils/recaptcha';
import { RecoverPasswordType } from '../../types/auth.types';

const initialValues: RecoverPasswordType = {
  email: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid format').required('Email is required'),
});

const RecoverPasswordForm: FC = () => {
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false)
  const [disableSend, setDisableSend] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '.75rem 2rem .75rem 2rem',
        }}>
        <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Recover Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, formikHelpers) => {
            setDisableSend(true)
            const recaptchaToken = await recaptchaVerify(executeRecaptcha)
            await userService.forgotPassword({ email: values.email, recaptchaToken })
              .then(() => setSuccess(true))
              .catch(() => setErr(true))
              .finally(() => setDisableSend(false))

            formikHelpers.resetForm()
          }}>
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
                  onInput={() => { setErr(false); setSuccess(false) }}
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
                />

                < Button
                  type='submit'
                  variant='contained'
                  sx={{ margin: '1rem 0 1rem 0' }}
                  disabled={!isValid || !dirty || disableSend}>
                  Recover Password
                </Button>

                {success && <Typography sx={{ textAlign: 'center', color: 'green' }}>
                  Please check your email
                </Typography>}

                {err && <Typography sx={{ textAlign: 'center', color: 'red' }}>
                  Something went wrong
                </Typography>}
              </Form>
            );
          }}
        </Formik>
      </Box >
    </Box >
  );
};

export default RecoverPasswordForm;
