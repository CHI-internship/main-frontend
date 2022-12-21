import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { userService } from '../../../api';
import { CurrentUserContext } from '../../../context';
import { formStyles, inputStyles } from '../../../styles';
import { multipleBase64 } from '../../../utils';

export const ProfileActivate: React.FC = () => {
  const { user } = useContext(CurrentUserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userId: user?.id,
      country: '',
      city: '',
      cardNumber: '',
      documents: []
    },
    onSubmit: async (values, formikHelpers) => {
      if (!formik.values.documents.length) return;
      await userService.activateVolunteer(values)
        .then(() => navigate('/profile'))
        .catch((err: unknown) => {
          const error = err as AxiosError;
          setError(error.message);
        })
        .finally(() => formikHelpers.resetForm());
    },
    validationSchema: yup.object({
      cardNumber: yup.number()
        .integer()
        .min(15, 'Card should be of minimum 15 characters length')
        .required('Card number is required'),
      country: yup.string()
        .min(3, 'Country should be of minimum 8 characters length')
        .required('Country is required'),
      city: yup.string()
        .min(3, 'City should be of minimum 8 characters length')
        .required('City is required')
    })
  });

  async function setFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.files) return;
    const base64Files = await multipleBase64(e.currentTarget.files);
    formik.setFieldValue('documents', base64Files);
  }

  return (
    <Box sx={formStyles}>
      <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
        Activate Profile
      </Typography>

      <form onSubmit={formik.handleSubmit} style={{ textAlign: 'center' }}>
        <TextField
          fullWidth
          id='country'
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='Country'
          helperText={formik.touched.country && formik.errors.country}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <TextField
          fullWidth
          id='city'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='City'
          helperText={formik.touched.city && formik.errors.city}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <TextField
          fullWidth
          id='cardNumber'
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='Card number'
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            accept='application/pdf, image/*'
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
            type='file'
            name='documents'
            onChange={setFile} />
          <label htmlFor='raised-button-file'>
            <Button variant='outlined' component='span'>
              Upload an identity document
            </Button>
          </label>
          <Button
            type='submit'
            variant='contained'
            sx={{ marginLeft: '10px' }}
            disabled={!formik.isValid || !formik.dirty}>
            Activate Profile
          </Button>
        </Box>
        {error && (
          <Typography sx={{ textAlign: 'center', color: 'red' }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};