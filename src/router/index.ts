import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:"Home",
        meta:{
            title:"首页",
            keepALive:true
        },
        component:() => import("../views/Home/index.vue")
    },
    {
        path:'/login',
        name:"Login",
        meta:{
            title:"登录页",
            keepALive:true
        },
        component:() => import("../views/Login/index.vue")
    }
];
const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;