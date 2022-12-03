import { AxiosError } from 'axios';

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
}

const hintService = new HintService();
export default hintService;