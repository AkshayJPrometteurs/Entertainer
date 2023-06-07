import axios from 'axios'
import Router from './Router';

const AxiosClient = axios.create({
    baseURL : 'http://localhost:8000/api'
})

AxiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config
})

AxiosClient.interceptors.response.use(response =>{
    return response;
}, error =>{
    if(error.response && error.response.status === 401){
        Router.navigate('/')
        return error;
    }
    throw error;
})

export default AxiosClient;