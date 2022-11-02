import * as yup from 'yup'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Input } from '@mui/material'
import style from './ProfileName.module.scss'
import editIcon from '../../../images/icons/edit.icon.svg'
import confirmIcon from '../../../images/icons/confirm.icon.svg'
import cancelIcon from '../../../images/icons/cancel.icon.svg'
import { updateProfileLastname, updateProfileName } from '../../../api/user/update-profile'


interface IProfileNameProps {
  userId: number
  initialName: string
  initialLastname: string
}

export default function ProfileName({ userId, initialName, initialLastname }: IProfileNameProps) {
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(false)
  const [name, setName] = useState(initialName)
  const [lastname, setLastname] = useState(initialLastname)

  const formik = useFormik({
    initialValues: { name, lastname },
    onSubmit: async (values) => {
      if (name !== values.name) {
        await updateProfileName(userId, values.name)
          .then((data) => { setName(data); setEditing(false) })
          .catch(() => setError(true))
      }
      if (lastname !== values.lastname) {
        await updateProfileLastname(userId, values.lastname)
          .then((data) => { setLastname(data); setEditing(false) })
          .catch(() => setError(true))
      }
      else setEditing(false)
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required')
        .min(2, 'Too Short!').max(20, 'Too Long!'),
      lastname: yup.string().required('Lastname is required')
        .min(2, 'Too Short!').max(20, 'Too Long!')
    })
  })

  return (
    <div className={style.profileName}>
      {editing ?
        <form className={style.editing} onSubmit={formik.handleSubmit}>
          <div className={style.input}>
            <div className={style.inputError}>{formik.errors.name}</div>
            <Input
              id='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              inputProps={{ style: { fontSize: 20, width: 130, padding: 2, height: 25 } }} />
          </div>
          <div className={style.input}>
            <div className={style.inputError}>{formik.errors.lastname}</div>
            <Input
              id='lastname'
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{ style: { fontSize: 20, width: 130, padding: 2, height: 25 } }} />
          </div>
          <button type='submit'><img src={confirmIcon} /></button>
          <img src={cancelIcon} onClick={() => setEditing(false)} />
          {error && <div className={style.requestError}>Internal error</div>}
        </form>
        :
        <div className={style.nameInfo}>
          {name} {lastname}
          <img className={style.editIcon} src={editIcon} onClick={() => setEditing(true)} />
        </div>}
    </div >
  )
}
