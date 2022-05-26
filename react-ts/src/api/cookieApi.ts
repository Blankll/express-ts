import { Axios } from "axios";
const axios = new Axios({ baseURL: 'http://api.express-ts.com', withCredentials: true});
export const cookieApiClient = {
    setCookie: async () => {
        return axios.post('/setcookie');
    },
    getCookie: async () => {
        return axios.get('/cookie/tst');
    }
}
