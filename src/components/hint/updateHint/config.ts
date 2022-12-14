import * as yup from 'yup';

export const config = {
  validationSchema: yup.object({
    title: yup.string().min(3).required('Title is required'),
    info: yup.string().min(5).required('Info is required'),
    photo: yup.array().of(yup.string())
  }),
  initialValues: {
    title: '',
    info: '',
    photo: ''
  }
};