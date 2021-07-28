<template>
  <Loading v-show="LOADING" />
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
  margin-top: 60px;
}
</style>
