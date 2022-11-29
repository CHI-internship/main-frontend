type SignInType = {
  email: string;
  password: string;
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
  photo: string
};

export type { RegisterType, SignInType, RecoverPasswordType, UserType };
