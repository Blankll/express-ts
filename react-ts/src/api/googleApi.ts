import { Axios } from "axios";
const axios = new Axios({ baseURL: 'https://www.google.com', withCredentials: true});
export const googleApiClient = {

  sentRequest: async () => {
    return axios.get('');
  }
}
