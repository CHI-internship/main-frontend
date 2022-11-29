type SignInType = {
  email: string;
  password: string;
  recaptchaToken?: string;
};

type RegisterType = {
  email: string;
  name: string;
  lastname: string;
  photo?: string;
  password: string;
  recaptchaToken?: string;
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

export type { RegisterType, SignInType, UserType };
