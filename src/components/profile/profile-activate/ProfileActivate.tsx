import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { base64 } from '../../../utils';
import { userService } from '../../../api';
import { formStyles, inputStyles } from '../../../styles';
import { CurrentUserContext } from '../../../context';


export const ProfileActivate: React.FC = () => {
  const { user } = useContext(CurrentUserContext)
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      userId: user?.id,
      country: '',
      city: '',
      card_number: '',
      document: '',
      expansion: ''
    },
    onSubmit: async (values, formikHelpers) => {
      await submitRequest(values, formikHelpers)
    },
    validationSchema: yup.object({
      document: yup.string()
        .min(1, 'Select at least 1 file')
        .required('Document is required'),
      card_number: yup.number()
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
  })

  function setFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.files) return;
    const type = e.currentTarget.files[0].type.split('/')[1];
    formik.setFieldValue('expansion', type);
    base64(e.currentTarget.files[0]).then(data => {
      formik.setFieldValue('document', data)
    })
  }

  async function submitRequest(values: any, formikHelpers: any) {
    try {
      formikHelpers.resetForm();
      values.userId = user?.id;
      await userService.activateVolunteer(values)
      formikHelpers.resetForm();
      if (!error) navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Box sx={formStyles}>
      <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
        Activate Profile
      </Typography>

      <form onSubmit={formik.handleSubmit} style={{ textAlign: 'center' }}>
        <TextField
          id='country'
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='Country'
          helperText={formik.touched.country && formik.errors.country}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <TextField
          id='city'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='City'
          helperText={formik.touched.city && formik.errors.city}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <TextField
          id='card_number'
          value={formik.values.card_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyles.default}
          label='Card number'
          helperText={formik.touched.card_number && formik.errors.card_number}
          FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
        <input
          accept='application/pdf, image/*'
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple
          type='file'
          name='document'
          onChange={setFile} />
        <label htmlFor='raised-button-file'>
          <Button variant='outlined' component='span'  >
            Upload  an  identity  document
          </Button>
        </label>
        <Button
          type='submit'
          variant='contained'
          sx={{ margin: '1rem 0 1rem 0' }}
          disabled={!formik.isValid || !formik.dirty}>
          Activate Profile
        </Button>
        {error && (
          <Typography sx={{ textAlign: 'center', color: 'red' }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};



