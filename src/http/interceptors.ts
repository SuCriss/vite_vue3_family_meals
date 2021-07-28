import axios, { AxiosInstance,AxiosRequestConfig } from 'axios'

import {
    setToken,
    setRefreshToken,
    getToken,
    getTokenKey,
    getRefreshToken,
    getRefreshTokenKey,
    removeToken
}  from '../plugins/cookie'

export class Interceptors {
    instance:AxiosInstance;
    constructor(){
        this.instance = axios.create({
            baseURL:<string>import.meta.env.VITE_APP_URL,
            timeout:6000,
        })
    }
    // 初始化拦截器
    init(){

        // 请求拦截器
        this.instance.interceptors.request.use(
            (config)=>{
                const token = getToken();
                const  RefreshToken =  getRefreshToken()
                // 判断一下是否有cookie有的话把cookie放入请求头中
                if(token){
                    config.headers[getTokenKey()] = token;
                    config.headers[getRefreshTokenKey()] = RefreshToken
                }
                return config;
            },
            (err)=>{
                console.error('err', err)
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response)=>{
                const res = response.data;
                if(!response.status.toString().startsWith("2") || res.code === -1){
                    console.error('response', "系统错误，请检查API是否正常")
                }
                if(res.code !== 0){
                    if(res.code === -3){
                        console.error('logout', '登录过期');
                        removeToken()
                    }else{
                        if(res.msg) {
                            console.error(res.msg)
                        }
                    }
                    return Promise.resolve(res)
                }else{
                    // 返回成功存储token
                    const headers = response.headers;
                    const token = headers.token;
                    const refresh_token = headers['refresh-token'];
                    if(token && refresh_token){
                        setToken(token);
                        setRefreshToken(refresh_token)
                    } 
                    return res
                }
            },
            (error)=>{
                if(error.message === "Request failed with status code 500"){
                    console.error("系统错误，请检查API是否正常！");
                    return;
                }
                let code = -110;
                if(error && error.response && error.response.status){
                    code = error.response.status;
                    // 登录过期
                    if(code ===401 || code ===-3){
                        removeToken();
                    }
                }else{
                    console.error(error.message)
                }
                const err = {errCode:-110,errMsg:error.message || 'Error'}
                return Promise.resolve(err)
            }
        );
    }
    getInterceptors(){
        return this.instance;
    }
}