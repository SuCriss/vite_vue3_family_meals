export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'


export interface AxiosRequest {
    baseURL?:string;
    url:string;
    data?:any;
    params?:any;
    method?:Method;
    headers?:any;
    timeout?:number;
    responseType?:ResponseType;
}

export interface AxiosResponse {
    data?:any;
    headers:any;
    request?:any;
    status:number;
    code?:number;
    statusText:string;
    config:AxiosRequest;
}

export interface CustomResponse {
    readonly status:boolean;
    readonly message:string;
    data:any;
}

export interface GetDemo {
    phone:string;
    captcha:string;
}
export interface PostDemo {
    id:number,
    list:Array<{
        id:number;
        version:number;
    }>
}