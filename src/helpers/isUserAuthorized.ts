export const checkIsUserAuthorized = (deniedAccessWay: Function) => {
  if (!localStorage.getItem('access-token')) {
    deniedAccessWay();
  }
};
