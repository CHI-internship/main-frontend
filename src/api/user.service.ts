import { RegisterType, SignInType } from "../types/auth.types"
import { IForgotPassword, IResetPassword, IUpdatePassword, IUpdateProfile } from "../types/user.types"
import { axiosInstance } from "./axios-instance"

class UserService {

  async updatePofile({ userId, name, lastname }: IUpdateProfile) {
    const updatedUser = await axiosInstance.patch(
      'user', { userId, name, lastname })
      .then((data: any) => data.data)
    return updatedUser
  }

  async forgotPassword({ email, recaptchaToken }: IForgotPassword) {
    const emailSent = await axiosInstance.post(
      'password/forgot', { email, recaptchaToken })
      .then((data: any) => data.data)
    return emailSent
  }

  async resetPassword(data: IResetPassword) {
    const passwordReseted = await axiosInstance.patch(
      'password/reset', { ...data })
      .then((data: any) => data.data)
    return passwordReseted
  }

  async signIn(credentials: SignInType) {
    const res = await axiosInstance.post('auth/sign-in', credentials)
      .catch(err => { throw new Error(err) })

    if (res.headers.authorization) {
      localStorage.setItem('token',
        res.headers.authorization.replace('Bearer ', '')
      )
    }
    return res.data
  }

  async retrieve(token: string | null) {
    if (!token) { return }
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

  async updatePassword(data: IUpdatePassword) {
    const passwordUpdated = await axiosInstance.patch(
      'password/update', { ...data })
      .then((data: any) => data.data)
    return passwordUpdated
  }

}

const userService = new UserService();
export default userService;
