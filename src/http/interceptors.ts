import axios, { Method, AxiosRequestConfig } from 'axios'
import store from '@/store/index'
import {
    setToken,
    setRefreshToken,
    getToken,
    getTokenKey,
    getRefreshToken,
    getRefreshTokenKey,
    removeToken
} from '../plugins/cookie'


// 定义接口
interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: Function;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// axios实例
const instance = axios.create({
    timeout: 6000,
    responseType: 'json'
});

let loadingInstance: any;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method &&
            JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)
        ) {
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
}

// 请求拦截器
instance.interceptors.request.use(
    request => {
        // console.error('store', store)
        loadingInstance = store.dispatch('showLoading');
        const token = getToken();
        const RefreshToken = getRefreshToken()
        // 判断一下是否有cookie有的话把cookie放入请求头中
        if (token) {
            request.headers[getTokenKey()] = token;
            request.headers[getRefreshTokenKey()] = RefreshToken
        }
        removePending(request);
        request.cancelToken = new CancelToken((c) => {
            pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c })
        });
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        loadingInstance = store.dispatch('hideLoading');
        removePending(response.config);
        console.log('response', response)
        const res = response?.data;
        switch (res.code) {
            case 401:
                break;
            default:
                break;
        }
        if (res.code && res.code !== 0) {
            if (res.code === -3) {
                console.error('logout', '登录过期');
                removeToken()
            } else {
                if (res.message) {
                    console.error(res.message)
                }
            }
            return Promise.resolve(res)
        } else {
            // 返回成功存储token
            const headers = response.headers;
            const token = headers.token;
            const refresh_token = headers['refresh-token'];
            if (token && refresh_token) {
                setToken(token);
                setRefreshToken(refresh_token)
            }
            return res
        }
    },
    error => {
        loadingInstance = store.dispatch('hideLoading');
        const response = error.response;
        console.log('errorRes', response)
        // 根据返回的http状态码做不同的处理
        switch (response?.status) {
            case 401:
                // token失效
                break;
            case 403:
                // 没有权限
                break;
            case 500:
                // 服务端错误
                break;
            case 503:
                // 服务端错误
                break;
            default:
                break;
        }

        // 超时重新请求
        const config = error.config;
        // 全局请求次数，请求间隙
        const [RETRY_COUNT, RETRY_DELAY] = [1, 1000];
        if (config && RETRY_COUNT) {
            // 设置用于跟踪重试计数的变量
            config.__retryCount = config.__retryCount || 1;
            // 检查是否已经把重试的总数用完
            if (config.__retryCount >= RETRY_COUNT) {
                return Promise.reject(response.data || { message: error.message });
            }

            // 增加重试计数
            config.__retryCount++;
            // 创造新的Promise来处理指数后退
            const backoff = new Promise((resolve: any) => {
                setTimeout(() => {
                    resolve();
                }, RETRY_DELAY || 1)
            });
            return backoff.then(() => {
                return instance(config);
            });
        }
        // eslint-disable-next-line
        return Promise.reject(response.data || { message: error.message });
    }
);
export default instance;
