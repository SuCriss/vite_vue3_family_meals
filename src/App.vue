<template>
  <div class="loadingStyle" v-show="LOADING">
    <Loading color="#1989fa" class="loading" vertical>加载中...</Loading>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import { Loading } from 'vant'
import {useStore} from 'vuex'
export default defineComponent({
  name: 'App',
  components:{
    Loading
  },
  setup:()=>{
    const store = useStore();
    const LOADING =computed(()=>{
      return store.state.LOADING
    })
    return {
      LOADING
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  max-height: 100%;
  overflow: hidden;
}
.loadingStyle{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:121;
    display: table-cell;
    margin: auto;
    vertical-align: middle;
}
</style>
