import axios from "axios";
import { Helper } from "../utils";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    async (config) => {
        config.baseURL = process.env.REACT_APP_API_URL+'api/admin';
        config.headers.authorization = Helper.getTokenFromStorage();
        config.timeout = 60000;
        return config;
    },
    error => Promise.reject(error)
);

class AdminService {

    getAllUsers = () => new Promise((resolve, reject) => {
        axiosInstance.get('/user/all').then((response) => {
            if (response) {
                resolve(response.data);
            } else {
                reject(response.data.message);
            }
        }, error => {
            reject(error.response !== undefined ? error.response.data.message : error.message);
        })
    });

}

export default new AdminService();