import userService from '../api/user.service';

export const retrieveUser = async (setState: Function) => {
  const rawUser = await userService.retrieve(localStorage.getItem('token'));
  setState(rawUser);
};