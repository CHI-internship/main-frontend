import * as yup from 'yup'
import { useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import style from './CreateOrder.module.scss'
import orderService from '../../../api/orders.service'
import { FileUpload } from '../../../components/common'


interface ICreateOrderProps {
    defaultImage?: string
}

export const CreateOrder: React.FC<ICreateOrderProps> = ({ defaultImage }) => {
    const [img, setImg] = useState(defaultImage)
    const [imgErr, setImgErr] = useState(false)
    const [creationErr, setCreationErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [disableSend, setDisableSend] = useState(false)
    const timeoutRef = useRef(null)


    const formik = useFormik({
        initialValues: {
            title: '', info: '', finished_at: '',
            short_info: '', goal_amount: '', photo: ''
        },
        onSubmit: async (values) => {
            if (!values.photo) setImgErr(true)
            else {
                setDisableSend(true)
                await orderService.createOrder({
                    title: values.title,
                    short_info: values.short_info,
                    photo: values.photo,
                    info: values.info,
                    goal_amount: Number(values.goal_amount),
                    finished_at: values.finished_at
                })
                    .catch(() => setCreationErr(true))
                    .then(() => {
                        formik.resetForm()
                        setSuccess(true)
                        timeoutRef.current = window.setTimeout(() =>
                            setSuccess(false), 3000)
                    })
                    .finally(() => {
                        setImg(defaultImage)
                        setImgErr(false)
                        setCreationErr(false)
                        setDisableSend(false)
                    })
            }
        },
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            info: yup.string().required('Main info is required'),
            short_info: yup.string().required('Short info is required'),
            goal_amount: yup.number().required('Desired amount is required').min(1),
            finished_at: yup.string().required('Expiration date is required')
        })
    })

    return (
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <div className={style.imageUpload}>
                <div className={style.photo}
                    style={{ backgroundImage: `url(${img})` }}></div>
                <FileUpload callback={fileBase64 => {
                    if (fileBase64) {
                        setImg(fileBase64)
                        setImgErr(false)
                        formik.values.photo = fileBase64
                    }
                }} />
                {imgErr && <div className={style.error}>Error. Photo is required.</div>}
            </div>

            <div className={style.info}>
                <TextField
                    id='title'
                    label='Title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    margin='dense'
                    helperText={formik.touched.title && formik.errors.title}
                    FormHelperTextProps={{ style: { color: 'red' } }} />
                <TextField
                    id='info'
                    label='Main info'
                    value={formik.values.info}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiline
                    rows={2}
                    InputLabelProps={{ shrink: true }}
                    margin='dense'
                    helperText={formik.touched.info && formik.errors.info}
                    FormHelperTextProps={{ style: { color: 'red' } }} />
                <TextField
                    id='short_info'
                    label='Short info'
                    value={formik.values.short_info}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    margin='dense'
                    helperText={formik.touched.short_info && formik.errors.short_info}
                    FormHelperTextProps={{ style: { color: 'red' } }} />
                <TextField
                    id='goal_amount'
                    label='Desired amount'
                    type='number'
                    value={formik.values.goal_amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    margin='dense'
                    helperText={formik.touched.goal_amount && formik.errors.goal_amount}
                    FormHelperTextProps={{ style: { color: 'red' } }} />
                <TextField
                    id='finished_at'
                    label='Expiration date'
                    type='datetime-local'
                    value={formik.values.finished_at}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{ shrink: true }}
                    margin='dense'
                    helperText={formik.touched.finished_at && formik.errors.finished_at}
                    FormHelperTextProps={{ style: { color: 'red' } }} />
                <Button type='submit' disabled={disableSend}
                    variant='contained' sx={{ marginTop: '12px' }}>
                    Create order
                </Button>
                {creationErr && <div className={style.error}>
                    Error. Order was not created.</div>}
                {success && <div style={{ color: 'green' }}>
                    Order has been successfully created.</div>}
            </div>
        </form>
    )
}

CreateOrder.defaultProps = {
    defaultImage: 'https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg'
}