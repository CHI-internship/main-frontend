import { Button, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';

import { hintService } from '../../../api';
import { FileUpload } from '../../../components/common';
import style from './CreateHint.module.scss';

const CreateHint: FC = () => {
  const [error, setError] = useState('');
  const [imgErr, setImgErr] = useState(false);
  const [img, setImg] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      info: '',
      photo: ''
    },
    onSubmit: async (values, formikHelpers) => {
      try {
        if (values) {
          await hintService.createHint({
            title: values.title,
            info: values.info,
            photo: values.photo
          })
          formikHelpers.resetForm();
        }
      } catch (err: any) {
        const error = err as AxiosError;
        setError(error.message);
      } finally {
        setImg('')
        setImgErr(false)
      }
    },
    validationSchema: yup.object({
      title: yup.string().min(3).required('Title is required'),
      info: yup.string().min(5).required('Info is required'),
      photo: yup.array().of(yup.string())
    })
  });

  return (
    <div className={style.container}>
      <h2>Create Hint</h2>
      <form className={style.form} onSubmit={formik.handleSubmit}>
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
          callback={fileBase64 => {
            if (fileBase64) {
              setImg(fileBase64);
              setImgErr(false);
              formik.values.photo = fileBase64;
            }
          }}
        />
        <Button
          type='submit'
          color='success'
          variant='contained'
          disabled={!formik.isValid || !formik.dirty}
        >Create</Button>
        {error && <div className={style.error}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateHint;