import { AxiosError } from 'axios';

import { IHint } from '../types/hint.types';
import { axiosInstance } from './axios-instance';

class HintService {
  async createHint(data: IHint){
    return axiosInstance.post('hint',data).then(value => value.data)
      .catch((err: AxiosError) => {
        throw err
    } )
  }
}

const hintService = new HintService();
export default hintService;