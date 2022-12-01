
import { AxiosError, AxiosResponse } from 'axios';

import {
  IActivateVolunteer, IForgotPassword, IResetPassword, IUpdatePassword,
  IUpdateProfile,
  RegisterType, SignInType
} from '../types';
import { axiosInstance } from './axios-instance';

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

  async updateProfile({ name, lastname, image }: IUpdateProfile) {
    return axiosInstance
      .patch('user', { name, lastname, image })
      .then((data: AxiosResponse) => {
        return data.data;
      })
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async activateVolunteer(volunteer: IActivateVolunteer) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { userId, country, city, card_number, document, expansion } = volunteer;
    const acvivatedVolunteer = await axiosInstance
      .post('volunteer', { userId, country, city, card_number, document, expansion })
      .then((data: any) => data.data)
      .catch((e) => { throw new Error(e.response.data.message) });
    return acvivatedVolunteer;
  }

  async forgotPassword({ email, recaptchaToken }: IForgotPassword) {
    return axiosInstance.post(
      'password/forgot', { email, recaptchaToken })
      .then((data: AxiosResponse) => data.data);
  }

  async resetPassword(data: IResetPassword) {
    return axiosInstance
      .patch('password/reset', { ...data })
      .then((data: AxiosResponse) => data.data);
  }

  async updatePassword(data: IUpdatePassword) {
    return axiosInstance
      .patch('password/update', { ...data })
      .then((data: AxiosResponse) => data.data);
  }

  async getRole(id: number)  {
    const params = {
      id,
    }
    return axiosInstance
      .get('user/role-check', { params })
      .then((data: AxiosResponse) => data.data)
  }
}

const userService = new UserService();
export default userService;
