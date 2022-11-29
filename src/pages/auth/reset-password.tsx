import { Box, Button, Input, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import userService from '../../api/user.service'
import { recaptchaVerify } from '../../utils'


export const ResetPassword: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [resetToken] = useSearchParams()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { newPassword: '', newPasswordConfirm: '' },
    onSubmit: async (values) => {
      const recaptchaToken = await recaptchaVerify()
      await userService.resetPassword({
        newPassword: values.newPassword,
        newPasswordConfirm: values.newPasswordConfirm,
        resetToken: resetToken.get('resetToken'),
        recaptchaToken
      }).then(() => {
        setSuccess(true)
        formik.resetForm()
      }).catch(() => setError(true))
    },
    validationSchema: yup.object({
      newPassword: yup.string()
        .required('Password is required')
        .min(6, 'Too Short!').max(20, 'Too Long!'),
      newPasswordConfirm: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    })
  })

  return (
    <div>
      <form className={'style'} onSubmit={formik.handleSubmit}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '.75rem 2rem .75rem 2rem',
          width: '300px',
          margin: '0 auto'
        }}>
          <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
            Reset Password
          </Typography>
          <div className={'style'}>
            {formik.values.newPassword &&
              <Typography sx={{ color: 'red' }}>
                {formik.errors.newPassword}
              </Typography>}
            <Input id='newPassword'
              placeholder='New password'
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              inputProps={{ style: { width: 300, height: 40 } }} />
          </div>

          <div className={'style'}>
            {formik.values.newPasswordConfirm &&
              <Typography sx={{ color: 'red' }}>
                {formik.errors.newPasswordConfirm}
              </Typography>}
            <Input id='newPasswordConfirm'
              placeholder='New password confirm'
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              inputProps={{ style: { width: 300, height: 40 } }} />
          </div>

          {success && <Typography sx={{ color: 'green' }}>
            Password updated
          </Typography>}
          {error && <Typography sx={{ color: 'red' }}>
            Something went wrong. <a href='/recover-password'>Try again</a>
          </Typography>}

          <Button type='submit'
            variant='contained'
            disabled={success}
            sx={{ margin: '1rem 0 1rem 0' }}>
            Reset Password
          </Button>

          {success &&
            <Button onClick={() => navigate('/sign-in', { replace: true })}
              variant='contained'
              sx={{ margin: '0 auto' }}>
              Sing in
            </Button>}
        </Box>
      </form>
    </div>
  )
}
