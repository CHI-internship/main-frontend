import { AxiosError } from 'axios';

import { ICreateHint } from '../types/hint.types';
import { axiosInstance } from './axios-instance';

class HintService {
  async getHints(page = 1, limit = 10, sort = 'asc') {
    return axiosInstance.get('hint', { params: { limit, page, sort } })
      .then(value => value.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async getHintById(id: string) {
    return axiosInstance.get(`hint/${id}`).then(value => value.data)
      .catch((err: AxiosError) => {
        throw err;
      });
  }

  async createHint(data: ICreateHint) {
    return axiosInstance.post('hint', data).then(value => value.data)
      .catch((err: AxiosError) => {
        throw err
      })
  }
}

export const hintsService = new HintService();
