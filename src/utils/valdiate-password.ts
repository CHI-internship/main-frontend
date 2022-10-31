export const validatePassword = (password: string) => {
  const regEx = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return regEx.test(password);
};
