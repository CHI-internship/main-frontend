import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
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

  const initialValues = {
    userId: user?.id,
    country: '',
    city: '',
    card_number: '',
    document: '',
    expansion: '',
  }

  const validationSchema = yup.object({
    document: yup
      .string()
      .min(1, 'Select at least 1 file')
      .required('Document is required'),
    card_number: yup
      .number()
      .integer()
      .min(15, 'Card should be of minimum 15 characters length')
      .required('Card number is required'),
    country: yup
      .string()
      .min(3, 'Country should be of minimum 8 characters length')
      .required('Country is required'),
    city: yup
      .string()
      .min(3, 'City should be of minimum 8 characters length')
      .required('City is required'),
  });

  async function submitRequest(values: any, formikHelpers: any) {
    try {
      formikHelpers.resetForm();
      values.userId = user?.id;
      await userService.activateVolunteer(values)
      formikHelpers.resetForm();
      if (!error) navigate('/profile');
    } catch(e: any) {
      setError(e.message);
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={formStyles}>
        <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
          Activate Profile
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, formikHelpers) => {
            await submitRequest(values, formikHelpers);
          }}
        >
          {({ errors, touched, isValid, dirty, setFieldValue }) => {
            return (
              <Form
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Field
                  fullWidth
                  name='country'
                  type='country'
                  as={TextField}
                  required
                  style={inputStyles.default}
                  label='Country'
                  error={Boolean(errors.country) && Boolean(touched.country)}
                  helperText={Boolean(touched.country) && errors.country}
                />
                <Field
                  fullWidth
                  name='city'
                  type='city'
                  as={TextField}
                  required
                  style={inputStyles.default}
                  label='City'
                  error={Boolean(errors.city) && Boolean(touched.city)}
                  helperText={Boolean(touched.city) && errors.city}
                />
                <Field
                  fullWidth
                  name='card_number'
                  type='card_number'
                  as={TextField}
                  required
                  style={inputStyles.default}
                  label='Card number'
                  error={Boolean(errors.card_number) && Boolean(touched.card_number)}
                  helperText={Boolean(touched.card_number) && errors.card_number}
                />

                <input
                  accept='application/pdf, image/*'
                  style={{ display: 'none' }}
                  id='raised-button-file'
                  multiple
                  type='file'
                  name='document'
                  onChange={(event) => {
                    if (!event.currentTarget.files) return;
                    const type = event.currentTarget.files[0].type.split('/')[1];
                    setFieldValue('expansion', type);
                    base64(event.currentTarget.files[0]).then(data => {
                      setFieldValue('document', data)
                    })
                  }}
                />
                <label htmlFor='raised-button-file'>
                  <Button variant='outlined' component='span'  >
                    Upload  an  identity  document
                  </Button>
                </label>

                <Button
                  type='submit'
                  variant='contained'
                  sx={{ margin: '1rem 0 1rem 0' }}
                  disabled={!isValid || !dirty}
                >
                  Activate Profile
                </Button>

                {error && (
                  <Typography sx={{ textAlign: 'center', color: 'red' }}>
                    {error}
                  </Typography>
                )}
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};



