import {
  IResetUserPassword, IUpdateUserPassword,
  IUpdateUserProfile, RegisterType, SignInType
} from '../types';
import { axiosInstance } from './axios-instance';

class UserService {
  async retrieve(token: string | null) {
    if (!token) {
      return;
    }

    const res = await axiosInstance.get('user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  async signUp(user: RegisterType) {
    const res = await axiosInstance.post('auth/sign-up', user).catch(err => {
      throw new Error(err);
    });
    if (res.headers.authorization) {
      localStorage.setItem(
        'token',
        res.headers.authorization.replace('Bearer ', '')
      );
    }
    return res.data;
  }

  async signIn(credentials: SignInType) {
    const res = await axiosInstance
      .post('auth/sign-in', credentials)
      .catch(err => {
        throw new Error(err);
      });

    if (res.headers.authorization) {
      localStorage.setItem(
        'token',
        res.headers.authorization.replace('Bearer ', '')
      );
    }
    return res.data;
  }

  async updatePofile({ userId, name, lastname, image }: IUpdateUserProfile) {
    const updatedUser = await axiosInstance
      .patch('user', { userId, name, lastname, image })
      .then((data: any) => data.data);
    return updatedUser;
  }

  async forgotPassword(email: string) {
    const emailSent = await axiosInstance
      .post('password/forgot', { email })
      .then((data: any) => data.data);
    return emailSent;
  }

  async resetPassword(data: IResetUserPassword) {
    const passwordReseted = await axiosInstance
      .patch('password/reset', { ...data })
      .then((data: any) => data.data);
    return passwordReseted;
  }

  async updatePassword(data: IUpdateUserPassword) {
    const passwordUpdated = await axiosInstance
      .patch('password/update', { ...data })
      .then((data: any) => data.data);
    return passwordUpdated;
  }
}

const userService = new UserService();
export default userService;
