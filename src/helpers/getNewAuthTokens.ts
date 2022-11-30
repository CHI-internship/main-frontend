import { AxiosError } from 'axios';

import userService from '../api/user.service';
import { AuthTokensType } from '../types/auth-tokens.type';

export const getNewAuthTokens = async (
  refreshToken: string | null,
  deniedAccessWay?: Function,
  setError?: Function
) => {
  const res: AuthTokensType = await userService
    .refreshTokens(refreshToken)
    .catch(err => {
      console.log(err);
      if (err.response.data.message === 'jwt expired') {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        deniedAccessWay();
      } else {
        setError(err);
      }
    });

  return res;
};
