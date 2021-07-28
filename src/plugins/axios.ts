import { App } from 'vue'
/**
 * 基础数据 API 集合类
 * 集成Abstract
 * @date 2020-1-14
 */
 import Abstract from '@/http/index';
 import { GetDemo } from '@/http/types';
 
 class Basic extends Abstract {
     
     /**
      * get示例
      */
     getDemo(params: GetDemo) {
         return this.get({ url: 'Basic.getDemo', params });
     }
     
    
     
 }
 
 // 单列模式返回对象
 let instance;
 const http =  (() => {
     if (instance) return instance;
     instance = new Basic();
     return instance;
 })();


export const axiosPlugin = {
    install(app:App):void {
        app.config.globalProperties.$axios = http;
    }
}