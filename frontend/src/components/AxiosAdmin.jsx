import axios from "axios";
import Router from "./Router";

const AxiosAdmin = axios.create({
    baseURL : 'http://localhost:8000/api'
})

AxiosAdmin.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

AxiosAdmin.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response && error.response.status === 401){
        Router.navigate('/admin/login')
        return error;
    }
    throw error;
})

export default AxiosAdmin;