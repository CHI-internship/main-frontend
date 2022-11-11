type SignInType = {
  email: string;
  password: string;
  recaptchaToken?: string;
};

type SignUpType = {
  email: string;
  name: string;
  lastname: string;
  photo?: string;
  password: string;
  confirmPassword: string;
};

type RegisterType = {
  email: string;
  name: string;
  lastname: string;
  photo?: string;
  password: string;
  recaptchaToken?: string;
};

type RecoverPasswordType = {
  email: string;
};

type UserType = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  orders?: any;
};

export type {
  SignUpType,
  RegisterType,
  SignInType,
  RecoverPasswordType,
  UserType,
};
