// import {} from 'vue'
import getUrl  from "./config";
import instance from './interceptors'
import { AxiosRequest,CustomResponse } from './types'
import { Toast } from 'vant'

class Abstract{
    // 外部传入的baseurl
    protected baseURL:string = <string>import.meta.env.VITE_APP_BASE_URL;
    // 自定义header头
    protected headers:object = {
        ContentType:'application/json;charset=UTF-8'
    }
    private apiAxios({baseURL=this.baseURL,headers = this.headers,method,url,data,params,responseType}:AxiosRequest):Promise<CustomResponse>{
        // url解析
        const _url = (url as string).split('.');
        url = getUrl(_url[0],_url[1]);
        return new Promise((resolve,reject)=>{
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType
            })
            .then((res)=>{
                resolve({status:true,message:"success",data:res}) 
            }).catch((err)=>{
                console.log('2324addsaada')
                console.log(err)
                const message = err?.data?.message || err?.message || (url + '请求失败');
                Toast.fail({
                    message:message
                });
                // eslint-disable-next-line
                reject({ status: false, message, data: err});
            });
        });

    }

    /**
     * get请求
     * @param param0 
     * @returns 
     */
    protected get({baseURL,headers,url,data,params,responseType}:AxiosRequest){
        return this.apiAxios({baseURL,headers,method:'GET',url,data,params,responseType})
    }

    /**
     * POST请求
     * @param param0 
     * @returns 
     */
    protected post({baseURL,headers,url,data,params,responseType}:AxiosRequest){
        return this.apiAxios({baseURL,headers,method:'POST',url,data,params,responseType})
    }

    
    /**
     * PUT请求
     * @param param0 
     * @returns 
     */
    protected put({baseURL,headers,url,data,params,responseType}:AxiosRequest){
        return this.apiAxios({baseURL,headers,method:'PUT',url,data,params,responseType})
    }

    /**
     * DELETE请求
     * @param param0 
     * @returns 
     */
     protected delete({baseURL,headers,url,data,params,responseType}:AxiosRequest){
        return this.apiAxios({baseURL,headers,method:'DELETE',url,data,params,responseType})
    }
}

export default Abstract;