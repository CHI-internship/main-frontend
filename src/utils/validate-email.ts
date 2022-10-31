export const validateEmail = (email: string): boolean => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};
