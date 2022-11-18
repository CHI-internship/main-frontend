import { Field, Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { FC, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import userService from '../../../api/user.service';
import formStyles from '../../../styles/form-styles';
import inputStyles from '../../../styles/input-styles';
import { useNavigate } from 'react-router-dom';



interface IUser {
  id: number;
  email: string;
  name: string;
  lastnmae: string;
}

export const ProfileUpdate: FC = () => {
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();

  const initialValues = {
    user_id: user?.id,
    country: '',
    city: '',
    card_number: '',
    document: null
  }

  const validationSchema = yup.object({
        document: yup
          .string()
          .min(1, "Select at least 1 file")
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
        
    useEffect(() => {
      const token = localStorage.getItem('token');
      async function getUser(token: string | null) {
        const user = await userService.retrieve(token);
        setUser(user);
      }
      getUser(token);
    }, [])

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
            formikHelpers.resetForm();
            // await userService
            values.user_id = user?.id;
            console.log('submit', values)
            formikHelpers.resetForm();
            navigate('/profile');
          }}
        >
          {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
            return (
              <Form
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Field
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
                  accept="application/pdf, image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  name="document"
                  onChange={(event) => {
                    if (!event.currentTarget.files) return;
                    setFieldValue("document", event.currentTarget.files[0]);
                  }} 
                />
                <label htmlFor="raised-button-file">
                  <Button variant="outlined" component="span" >
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

                {success && (
                  <Typography sx={{ textAlign: 'center', color: 'green' }}>
                    Your information will be verified soon
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



