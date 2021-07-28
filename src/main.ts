import { createApp } from 'vue'
import App from './App.vue'
import router from  './router/index'
import store from './store/index'
import { axiosPlugin } from './plugins/axios'
createApp(App).use(router).use(store).use(axiosPlugin).mount('#app');
