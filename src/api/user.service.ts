import { IResetUserPassword, IUpdateUserPassword, IUpdateUserProfile } from '../types/user.types'
import { axiosInstance } from './axios-instance'
import { RegisterType, SignInType } from '../types/auth.types'

class UserService {
  async get(token: string | null) {
    if (!token) {
      return;
    }

    const res = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_SERVICE_URL}user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }

  async register(user: RegisterType) {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_SERVICE_URL}auth/sign-up`,
        user
      );
      if (res.headers.authorization) {
        localStorage.setItem(
          'token',
          res.headers.authorization.replace('Bearer ', '')
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async login(credentials: SignInType) {
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_SERVICE_URL}auth/sign-in`,
        credentials
      );
      if (res.headers.authorization) {
        localStorage.setItem(
          'token',
          res.headers.authorization.replace('Bearer ', '')
        );
      }
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async forgotPassword(email: string) {
    const emailSent = await axiosInstance.post(
      'password/forgot', { email })
      .then((data: any) => data.data)
    return emailSent
  }

  async resetPassword(data: IResetUserPassword) {
    const passwordReseted = await axiosInstance.patch(
      'password/reset', { ...data })
      .then((data: any) => data.data)
    return passwordReseted
  }

  async updatePassword(data: IUpdateUserPassword) {
    const passwordUpdated = await axiosInstance.patch(
      'password/update', { ...data })
      .then((data: any) => data.data)
    return passwordUpdated
  }
}

const userService = new UserService();
export default userService;
