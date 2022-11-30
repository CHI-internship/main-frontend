import { AxiosResponse } from 'axios';

import userService from '../api/user.service';
import { getNewAuthTokens } from './getNewAuthTokens';

export const retrieveUser = async (
  setState: Function,
  deniedAccessWay?: Function,
  setError?: Function
) => {
  try {
    const rawUser = await userService.retrieve(
      localStorage.getItem('access-token')
    );
    setState(rawUser);
  } catch (err) {
    if (err === 'no access rights') {
      const tokens = await getNewAuthTokens(
        localStorage.getItem('refresh-token'),
        deniedAccessWay,
        setError
      );
      const rawUser = await userService.retrieve(tokens.accessToken);
      setState(rawUser);
    } else {
      setError(err);
    }
  }
  // const rawUser = await userService
  //   .retrieve(localStorage.getItem('access-token'))
  //   .catch(async err => {
  //     console.log(err);
  //     if (err === 'no access rights') {
  //       const tokens = await getNewAuthTokens(
  //         localStorage.getItem('refresh-token'),
  //         deniedAccessWay,
  //         setError
  //       );
  //       console.log(tokens);
  //       const rawUser = await userService.retrieve(tokens.accessToken);
  //       setState(rawUser);
  //     } else {
  //       setError(err);
  //     }
  //   });
  // setState(rawUser);
};
