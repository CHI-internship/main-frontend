import { faker } from '@faker-js/faker';
import { AxiosError, AxiosResponse } from 'axios';

import {
  IActivateVolunteer,
  IForgotPassword,
  IResetPassword,
  IUpdatePassword,
  IUpdateProfile,
  IUserScore,
  RegisterType,
  SignInType,
} from '../types';
import { axiosInstance } from './axios-instance';

class UserService {
  async retrieve(token: string | null) {
    if (!token) return;
    const res = await axiosInstance
      .get('user', { headers: { Authorization: `Bearer ${token}` } })
      .catch(err => {
        if (err.response.data.message === 'no access rights') {
          throw err.response.data.message;
        } else throw err;
      });
    return res.data;
  }

  async refreshTokens(refreshToken: Readonly<string>) {
    if (!refreshToken) {
      return;
    }
    const res = await axiosInstance
      .post('auth/refresh-tokens', {
        refreshToken: `Bearer ${refreshToken}`,
      })
      .catch(err => {
        throw err;
      });

    if (res.data) {
      localStorage.setItem('access-token', res.data.accessToken);
      localStorage.setItem('refresh-token', res.data.refreshToken);
    }

    return res.data;
  }

  async signUp(user: RegisterType) {
    const res = await axiosInstance
      .post('auth/sign-up', user)
      .catch((err: AxiosError) => {
        throw err;
      });
    if (res.data) {
      localStorage.setItem('access-token', res.data.accessToken);
      localStorage.setItem('refresh-token', res.data.refreshToken);
    }
    return res.data;
  }

  async signIn(credentials: SignInType) {
    const res = await axiosInstance
      .post('auth/sign-in', credentials)
      .catch(err => {
        if (err.response.data.message === 'Invalid email or password') {
          throw err.response.data.message;
        } else {
          throw err;
        }
      });

    if (res.data) {
      localStorage.setItem('access-token', res.data.accessToken);
      localStorage.setItem('refresh-token', res.data.refreshToken);
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

  async activateVolunteer(payload: IActivateVolunteer) {
    return axiosInstance.post('volunteer', payload)
      .then((data: any) => data.data)
      .catch((err: AxiosError) => { throw new Error(err.message) });
  }

  async forgotPassword({ email, recaptchaToken }: IForgotPassword) {
    return axiosInstance
      .post('password/forgot', { email, recaptchaToken })
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

  async getUserWithVolunteerAndOrders() {
    return axiosInstance
      .get('user/attach', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` },
      })
      .then((data: AxiosResponse) => data.data);
  }

  async roleIsVolunteer(id: number) {
    const params = {
      id,
    }
    return axiosInstance
      .get('user/role-check', { params })
      .then((data: AxiosResponse) => data.data)
  }

  async getUsersForRateboard(role: string) {
    const users: IUserScore[] = [];

    for(let i = 0; i < 6; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.avatar(),
        score: faker.random.numeric(5),
      })
    }

    return users;
  }
}

const userService = new UserService();
export default userService;
