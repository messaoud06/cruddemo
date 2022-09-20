import axios from "axios";
import { Helper } from "../utils";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL+'auth';
        config.timeout = 60000;
        return config;
    },
    error => Promise.reject(error)
);

class RegisterService {

register = (registration) => new Promise((resolve, reject) => {
    axiosInstance.post('/register', registration).then((response) => {
        if (response.data.code === 0) {
            //Helper.setTokenInStorage(response.data.authorization);
            resolve(response.data);
        } else {
            reject(response.data.message);
        }
    }, error => {
        reject(error.response !== undefined ? error.response.data.message : error.message);
    })
});

}

export default new RegisterService();
