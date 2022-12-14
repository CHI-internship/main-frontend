import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { hintsService } from '../../../api';
import { FileUpload } from '../../common';
import { config } from './config';
import style from './UpdateHint.module.scss';

interface IProps {
  open: boolean;
  handleClose: any;
}

const UpdateHint: FC<IProps> = ({ open, handleClose }) => {
  const [error, setError] = useState('');
  const [imgErr, setImgErr] = useState(false);
  const [img, setImg] = useState('');
  const { id } = useParams<string>();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: config.initialValues,
    onSubmit: async (values, formikHelpers) => {
      try {
        if (values) {
          const data = {
            title: values.title,
            info: values.info,
            photo: values.photo
          }
          await hintsService.updateHint(id, data);
          formikHelpers.resetForm();
          navigate('/hints')
        }
      } catch (err: any) {
        setError(err.response.data.message);
      } finally {
        setImg('');
        setImgErr(false);
      }
    },
    validationSchema: config.validationSchema
  });

  const getPhoto = (fileBase64:string) => {
    if (fileBase64) {
      setImg(fileBase64);
      setImgErr(false);
      formik.values.photo = fileBase64;
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={style.dialogTitle}>Update Hint</DialogTitle>
        <form className={style.form} onSubmit={formik.handleSubmit}>
          <DialogContent className={style.dialogContent}>
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
            <FileUpload
              multiple
              callback={fileBase64 => getPhoto(fileBase64)}
            />
          </DialogContent>
          <DialogActions className={style.dialogActions}>
            <Button onClick={handleClose} color='error'>Cansel</Button>
            <Button
              type='submit'
              color='success'
              variant='contained'
              disabled={!formik.isValid || !formik.dirty}
            >Update</Button>
          </DialogActions>
          {error && <div className={style.error}>{error}</div>}
        </form>
    </Dialog>
  );
};

export default UpdateHint;