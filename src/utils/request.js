import axios  from "axios";
import { config } from "vue/types/umd";

const http = axios.create({
    baseURL:'/api',
    timeout:20000,
})

//请求拦截器
http.interceptors.request.use(function(config){
    //发送请求前做什么
    return config;
},function(error){
    //请求错误做什么
    return Promise.reject(error);
});

//响应拦截器
http.interceptors.response.use(function(response){
    //响应请求前做什么
    return response;
},function(error){
    //响应错误做什么
    return Promise.reject(error);
});

export default http