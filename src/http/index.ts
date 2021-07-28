import {AxiosPromise,AxiosResponse} from 'axios'
import { Interceptors } from './interceptors'

export class HttpServer{
    axios:any;
    constructor(){
        this.axios = new Interceptors().getInterceptors();
        this.request = this.request.bind(this)
    };
    request(config:any):AxiosPromise{
        return new Promise((resolve,reject)=>{
            this.axios(config).then((res:AxiosResponse)=>{
                resolve(res.data)
            }).catch((err:any)=>{
                reject(err)
            })
        })
    }
}
const http  = new HttpServer();
export default http;