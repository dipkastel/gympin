import axios from 'axios';
import Pocket from '../pocket/Pocket';



const requestInterceptor = () => ({
    baseURL:"http://localhost:8080/api/",
    headers:{
        Authorization:Pocket.getInstance().getToken()
    }
});

class AxiosClient {
    getAxios() {
        const instance = axios.create(requestInterceptor());



        return instance;
    }
}

export default AxiosClient;
