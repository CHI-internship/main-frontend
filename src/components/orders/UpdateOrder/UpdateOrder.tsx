import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import { Field, Form, Formik, FormikValues } from 'formik';
import orderService from '../../../api/orders.service';
import { IOrder } from '../../../types';
import styles from './UpdateOrder.module.scss';
import { toBase64 } from '../../../helpers';

interface IProps {
  open: boolean;
  handleClose: any;
  order: IOrder,
  setOrder: Dispatch<SetStateAction<IOrder>>
}
const  initialValues = {
  title: '',
  info: '',
  short_info: '',
  goal_amount: '',
  photo: '',
  sum: '',
};

const validationSchema =  yup.object({
  title: yup.string().min(3).required('Title is required'),
  info: yup.string().min(5).required('Info is required'),
  sum: yup.number().required('Sum is required'),
  goal_amount: yup.number().required('Goal Amount is required'),
  short_info: yup.string().min(15).required('Short info is required'),
  photo: yup.string().required(),
  finished_at: yup.string().required()
})

const UpdateOrder: FC<IProps> = ({ open, handleClose, order, setOrder }) => {

  const [error,setError] = useState<string>('');

  const onSubmit = async (values: FormikValues,formikHelpers:any) => {
    try {
      if (values) {
        const updatedOrder = await orderService.updateOrder(order.id, {
          title: values.title,
          info: values.info,
          short_info: values.short_info,
          sum: +values.sum,
          goal_amount: +values.goal_amount,
          photo: values.photo,
          finished_at: values.finished_at
        });
        setOrder(updatedOrder)
        handleClose();
        formikHelpers.resetForm();
      }
    }catch (e:any) {
      setError(e.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Update Order</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          await onSubmit(values, formikHelpers);
        }}
      >
        {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
          return(
            <Form className={styles.form}>
              <DialogContent className={styles.dialogContent}>
                <Field
                  as={TextField}
                  name='title'
                  type='title'
                  label='Title'
                  fullWidth
                  error={Boolean(errors.title) && Boolean(touched.title)}
                  helperText={Boolean(touched.title) && errors.title}
                />
                <Field
                  as={TextField}
                  name='info'
                  type='info'
                  label='Info'
                  fullWidth
                  error={Boolean(errors.info) && Boolean(touched.info)}
                  helperText={Boolean(touched.info) && errors.info}
                />
                <Field
                  as={TextField}
                  name='sum'
                  type='sum'
                  label='Sum'
                  fullWidth
                  error={Boolean(errors.sum) && Boolean(touched.sum)}
                  helperText={Boolean(touched.sum) && errors.sum}
                />
                <Field
                  as={TextField}
                  name='goal_amount'
                  type='goal_amount'
                  label='Goal_amount'
                  fullWidth
                  error={Boolean(errors.goal_amount) && Boolean(touched.goal_amount)}
                  helperText={Boolean(touched.goal_amount) && errors.goal_amount}
                />
                <Field
                  as={TextField}
                  name='short_info'
                  type='short_info'
                  label='Short Info'
                  fullWidth
                  error={Boolean(errors.short_info) && Boolean(touched.short_info)}
                  helperText={Boolean(touched.short_info) && errors.short_info}
                />
                <Field
                  as={TextField}
                  type='datetime-local'
                  name='finished_at'
                  fullWidth
                />
                <input
                  accept='application/pdf, image/*'
                  style={{ display: 'none' }}
                  id='raised-button-file'
                  multiple
                  type='file'
                  name='photo'
                  onChange={(event) => {
                    if (!event.currentTarget.files) return;
                    const type = event.currentTarget.files[0].type.split('/')[1];
                    setFieldValue('expansion', type);
                    toBase64(event.currentTarget.files[0]).then(data => {
                      setFieldValue('photo', data);
                    })
                  }}
                />
                <label htmlFor='raised-button-file'>
                  <Button variant='outlined' component='span'  >
              Upload  Order
                  </Button>
                </label>
              </DialogContent>
              <DialogActions className={styles.dialogActions}>
                <Button onClick={handleClose} color='error'>Cansel</Button>
                <Button
                  type='submit'
                  color='success'
                  variant='contained'
                  disabled={!isValid || !dirty}
                >Update</Button>
              </DialogActions>
              {error && <div className={styles.error}>{error}</div>}
            </Form>
          )}}
      </Formik>
    </Dialog>
  );
};

export default UpdateOrder;