type SignInType = {
  email: string;
  password: string;
};

type SignUpType = {
  email: string;
  name: string;
  lastname: string;
  password: string;
  confirmPassword: string;
};

type RegisterType = {
  email: string;
  name: string;
  lastname: string;
  photo?: string;
  password: string;
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
  volunteer?: any;
};

export type {
  SignUpType,
  RegisterType,
  SignInType,
  RecoverPasswordType,
  UserType,
};
