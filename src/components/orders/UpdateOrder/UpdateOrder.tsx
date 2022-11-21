import { Dispatch, FC, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import * as yup from 'yup';
import { Form, Formik, FormikValues,Field } from 'formik';
import orderService from '../../../api/orders.service';
import { IOrder } from '../../../types/order.types';
import styles from './UpdateOrder.module.scss';

interface IProps {
  open: boolean;
  handleClose: any;
  order:IOrder,
  setOrder:Dispatch<SetStateAction<IOrder>>
}

const initialValues: any = {
  title: '',
  info: '',
  short_info: ''
};

const validationSchema = yup.object({
  title: yup.string().min(3).required('Title is required'),
  info: yup.string().min(5).required('Info is required'),
  sum: yup.number().required('Sum is required'),
  goal_amount: yup.number().required('Goal Amount is required'),
  short_info: yup.string().min(15).required('Short info is required'),
});
const UpdateOrder: FC<IProps> = ({ open, handleClose,order,setOrder }) => {

  const updateOrder = async (values: FormikValues) => {
    if (values) {
      await orderService.updateOrder(order.id, {
        title: values.title,
        info: values.info,
        short_info: values.short_info,
        sum: +values.sum,
        goal_amount: +values.goal_amount
      })
        .then(value => setOrder(value))
        .catch(e => {
          console.log(e);
        })
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Update Order</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          await updateOrder(values);
          formikHelpers.resetForm();
        }}
      >
        {({ values, errors, touched, isValid, dirty }) => {
          return (
            <Form className={styles.form}>
              <DialogContent className={styles.dialogContent}>
                <Field
                  as={TextField}
                  label='Title'
                  name='title'
                  type='title'
                  fullWidth
                  error={Boolean(errors.title) && Boolean(touched.title)}
                  helperText={Boolean(touched.title) && errors.title}
                />
                <Field
                  as={TextField}
                  label='Info'
                  name='info'
                  type='info'
                  fullWidth
                  error={Boolean(errors.info) && Boolean(touched.info)}
                  helperText={Boolean(touched.info) && errors.info}
                />
                <Field
                  as={TextField}
                  label='Sum'
                  name='sum'
                  type='sum'
                  fullWidth
                  error={Boolean(errors.sum) && Boolean(touched.sum)}
                  helperText={Boolean(touched.sum) && errors.sum}
                />
                <Field
                  as={TextField}
                  label='Goal Amount'
                  name='goal_amount'
                  type='goal_amount'
                  fullWidth
                  error={Boolean(errors.goal_amount) && Boolean(touched.goal_amount)}
                  helperText={Boolean(touched.goal_amount) && errors.goal_amount}
                />
                <Field
                  as={TextField}
                  label='Short Info'
                  name='short_info'
                  type='short_info'
                  fullWidth
                  error={Boolean(errors.short_info) && Boolean(touched.short_info)}
                  helperText={Boolean(touched.short_info) && errors.short_info}
                />
              </DialogContent>
              <DialogActions className={styles.dialogActions}>
                <Button onClick={handleClose} color='error' >Cansel</Button>
                <Button
                  type='submit'
                  color='success'
                  disabled={!isValid || !dirty}
                  variant='contained'
                >Update</Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default UpdateOrder;