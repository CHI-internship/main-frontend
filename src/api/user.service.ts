import {
  IForgotPassword,
  IResetPassword, IUpdatePassword,
  IUpdateProfile, RegisterType, SignInType
} from '../types';
import { axiosInstance } from './axios-instance';
import { AxiosError, AxiosResponse } from 'axios';

class UserService {

  async retrieve(token: string | null) {
    if (!token) return
    const res = await axiosInstance.get('user',
      { headers: { Authorization: `Bearer ${token}` } })
      .catch(err => {
        if (err.response.data.message === 'no access rights') {
          throw err.response.data.message
        } else throw err
      })
    return res.data
  }

  async signUp(user: RegisterType) {
    const res = await axiosInstance.post('auth/sign-up', user)
      .catch((err: AxiosError) => { throw err })
    if (res.headers.authorization) {
      localStorage.setItem('token',
        res.headers.authorization.replace('Bearer ', '')
      );
    }
    return res.data;
  }

  async signIn(credentials: SignInType) {
    const res = await axiosInstance.post('auth/sign-in', credentials)
      .catch(err => {
        if (err.response.data.message === 'Invalid email or password') {
          throw err.response.data.message;
        } else { throw err }
      })
    if (res.headers.authorization) {
      localStorage.setItem('token',
        res.headers.authorization.replace('Bearer ', '')
      );
    }
    return res.data;
  }

  async updateProfile({ userId, name, lastname, image }: IUpdateProfile) {
    const updatedUser = await axiosInstance
      .patch('user', { userId, name, lastname, image })
      .then((data: AxiosResponse) => data.data)
    return updatedUser;
  }

  async forgotPassword({ email, recaptchaToken }: IForgotPassword) {
    const emailSent = await axiosInstance.post(
      'password/forgot', { email, recaptchaToken })
      .then((data: AxiosResponse) => data.data)
    return emailSent
  }

  async resetPassword(data: IResetPassword) {
    const passwordReseted = await axiosInstance
      .patch('password/reset', { ...data })
      .then((data: AxiosResponse) => data.data);
    return passwordReseted;
  }

  async updatePassword(data: IUpdatePassword) {
    const passwordUpdated = await axiosInstance
      .patch('password/update', { ...data })
      .then((data: AxiosResponse) => data.data);
    return passwordUpdated;
  }
}

const userService = new UserService();
export default userService;
