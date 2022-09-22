
import axios from "axios";
import { Helper } from "../utils";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL+'auth';
        //config.headers.authorization = Helper.getTokenFromStorage();
        config.timeout = 60000;
        return config;
    },
    error => Promise.reject(error)
);


class AuthService {

    login = (credentials) => new Promise((resolve, reject) => {
        axiosInstance.post('/login', credentials).then((response) => {
            if (response.data.code === 0) {
                Helper.setTokenInStorage(response.data.authorization);
                resolve(response.data);
            } else {
                reject(response.data.message);
            }
        }, error => {
            reject(error.response !== undefined ? error.response.data.message : error.message);
        })
    });


   

    logout = () => new Promise((resolve, reject) => {
        if (Helper.getTokenFromStorage() !== null) {
            axiosInstance.get('/api/logout?token='+Helper.getTokenFromStorage()).then((response) => {
                response.data.code === 0 ? resolve(response.data.message) : reject(response.data.message);
            }, error => {
                reject(error.response !== undefined ? error.response.data.message : error.message);
            }).then(() => {
                Helper.removeTokenFromStorage();
            });
        } else {
            resolve();
        }
    });

}

export default new AuthService();