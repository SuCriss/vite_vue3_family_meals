import { createStore } from 'vuex'

export default createStore({
    state:{
        LOADING:false,
        listData:{1:10},
        num:10       
    },
    mutations:{
        setData(state,value){
            state.listData = value;
        },
        addNum(state){
            state.num +=10;
        },
        showLoading(state,value){
            state.LOADING = value
        },
        hideLoading(state,value){
            state.LOADING = value
        }
    },
    actions:{
        setData(context,value){
            context.commit('setData',value)
        },
        showLoading(context){
            context.commit('showLoading',true)
        },
        hideLoading(context){
            context.commit('hideLoading',false)
        }
    },modules:{}
});
