import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as yup from 'yup';

import userService from '../../api/user.service';
import { inputStyles } from '../../styles'


const RecoverPasswordForm: FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [success, setSuccess] = useState(false)
  const [err, setErr] = useState(false)
  const [disableSend, setDisableSend] = useState(false)


  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: async (values, formikHelpers) => {
      setDisableSend(true)
      const recaptchaToken = await executeRecaptcha('action')
      await userService.forgotPassword({ email: values.email, recaptchaToken })
        .then(() => setSuccess(true))
        .catch(() => setErr(true))
        .finally(() => setDisableSend(false))
      formikHelpers.resetForm()
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid format').required('Email is required')
    })
  })

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      border: '1px solid black',
      borderRadius: '5px',
      width: '300px',
      margin: '0 auto',
      padding: '.75rem 2rem .75rem 2rem'
    }}>
      <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
        Recover Password
      </Typography>

      <form onSubmit={formik.handleSubmit}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
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
        <Button
          type='submit'
          variant='contained'
          sx={{ margin: '1rem 0 1rem 0' }}
          disabled={!formik.isValid || !formik.dirty || disableSend}>
          Recover Password
        </Button>

        {success && <Typography sx={{ textAlign: 'center', color: 'green' }}>
          Please check your email
        </Typography>}
        {err && <Typography sx={{ textAlign: 'center', color: 'red' }}>
          Something went wrong
        </Typography>}
      </form>
    </Box>
  );
};

export default RecoverPasswordForm;
