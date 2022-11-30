import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import * as yup from 'yup';

import { orderService } from '../../../api';
import { IOrder } from '../../../types';
import { base64 } from '../../../utils';
import styles from './UpdateOrder.module.scss';


interface IProps {
  open: boolean;
  handleClose: any;
  order: IOrder,
  setOrder: Dispatch<SetStateAction<IOrder>>
}


const UpdateOrder: FC<IProps> = ({ open, handleClose, order, setOrder }) => {
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '', info: '', short_info: '',
      goal_amount: '', photo: '', sum: '',
      finished_at: ''
    },
    onSubmit: async (values, formikHelpers) => {
      try {
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
      } catch (err: any) {
        const error = err as AxiosError;
        setError(error.message);
      }
    },
    validationSchema: yup.object({
      title: yup.string().min(3).required('Title is required'),
      info: yup.string().min(5).required('Info is required'),
      sum: yup.number().required('Sum is required'),
      goal_amount: yup.number().required('Goal Amount is required'),
      short_info: yup.string().min(15).required('Short info is required'),
      photo: yup.string().required(),
      finished_at: yup.string().required()
    })
  })

  function setFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget.files) return;
    const type = e.currentTarget.files[0].type.split('/')[1];
    formik.setFieldValue('expansion', type);
    base64(e.currentTarget.files[0]).then(data => {
      formik.setFieldValue('photo', data);
    })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Update Order</DialogTitle>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <DialogContent className={styles.dialogContent}>
          <TextField
            id='title'
            label='Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.title && formik.errors.title}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='info'
            label='Info'
            value={formik.values.info}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.info && formik.errors.info}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='sum'
            type='number'
            label='Sum'
            value={formik.values.sum}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.sum && formik.errors.sum}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='goal_amount'
            type='number'
            label='Goal amount'
            value={formik.values.goal_amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.goal_amount && formik.errors.goal_amount}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='short_info'
            label='Short info'
            value={formik.values.short_info}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.short_info && formik.errors.short_info}
            FormHelperTextProps={{ style: { color: 'red', fontSize: '11px' } }} />
          <TextField
            id='finished_at'
            type='datetime-local'
            value={formik.values.finished_at}
            onChange={formik.handleChange} />
          <input
            accept='application/pdf, image/*'
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
            type='file'
            name='photo'
            onChange={setFile} />
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
            disabled={!formik.isValid || !formik.dirty}
          >Update</Button>
        </DialogActions>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Dialog>
  );
};

export default UpdateOrder;