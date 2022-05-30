import { Axios } from "axios";
const axios = new Axios({ baseURL: 'http://api.express-ts.com:4000', withCredentials: true});
export const cookieApiClient = {
    setCookie: async () => {
        return axios.post('/api/setcookie');
    },
    getCookie: async () => {
        return axios.get('/api/cookie/tst');
    }
}
