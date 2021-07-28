import { App } from 'vue'
import http from '../http/index'
import { AxiosInstance } from 'axios'

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $axios?:AxiosInstance
    }
}

export const axiosPlugin = {
    install(app:App):void {
        app.config.globalProperties.$axios = http;
    }
}