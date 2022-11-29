import { Input } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as yup from 'yup';

import { userService } from '../../../api';
import { CurrentUserContext } from '../../../context';
import { cancelIcon, confirmIcon, editIcon } from '../../../images';
import { IUpdateProfile, IUser } from '../../../types';
import style from './ProfileName.module.scss';


export const ProfileName: React.FC = () => {
  const { user, setUser } = useContext(CurrentUserContext)
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: { name: user?.name, lastname: user?.lastname },
    onSubmit: async values => {
      const sendData: IUpdateProfile = {};
      if (user?.name !== values.name || user?.lastname !== values.lastname) {
        if (user?.name !== values.name) sendData.name = values.name;
        if (user?.lastname !== values.lastname) sendData.lastname = values.lastname;

        await userService
          .updateProfile(sendData)
          .then((data: IUser) => {
            setUser({ ...user, name: data.name, lastname: data.lastname })
            setEditing(false)
          })
          .catch(() => setError(true));
      } else setEditing(false);
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Name is required')
        .min(2, 'Too Short!')
        .max(20, 'Too Long!'),
      lastname: yup
        .string()
        .required('Lastname is required')
        .min(2, 'Too Short!')
        .max(20, 'Too Long!'),
    }),
  });

  return (
    <div className={style.profileName}>
      {editing ? (
        <form className={style.editing} onSubmit={formik.handleSubmit}>
          <div className={style.input}>
            <div className={style.inputError}>{formik.errors.name}</div>
            <Input
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              inputProps={{
                style: { fontSize: 20, width: 130, padding: 2, height: 25 },
              }}
            />
          </div>
          <div className={style.input}>
            <div className={style.inputError}>{formik.errors.lastname}</div>
            <Input
              id='lastname'
              value={formik.values.lastname}
              onChange={formik.handleChange}
              inputProps={{
                style: { fontSize: 20, width: 130, padding: 2, height: 25 },
              }}
            />
          </div>
          <button type='submit'>
            <img src={confirmIcon} />
          </button>
          <img src={cancelIcon} onClick={() => setEditing(false)} />
          {error && <div className={style.requestError}>Internal error</div>}
        </form>
      ) : (
        <div className={style.nameInfo}>
          {user?.name} {user?.lastname}
          <img
            className={style.editIcon}
            src={editIcon}
            onClick={() => setEditing(true)}
          />
        </div>
      )}
    </div>
  );
};
