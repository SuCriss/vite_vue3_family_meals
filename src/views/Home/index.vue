<template>
  <h1>{{ msg }}</h1>
  <Button type="primary">主要按钮</Button>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, toRaw, onMounted,getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { Button } from "vant";

export default defineComponent({
  name: "Home",
  components: {
    Button,
  },
  setup: () => {
    const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
    onMounted(() => {
      axios.getDemo({ phone: "17689475843", captcha: "2482" })
        .then((res: any) => {
          console.log(res);
        }).catch((err:any)=>{
          console.log(err)
        });
    });
    const store = useStore();
    console.log(store.dispatch("setData", { id: 1 }));
    const state = reactive({
      msg: "Welcome to vite + vue3 Family meals",
      listData: toRaw(store.state.listData),
    });

    return { ...toRefs(state) };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
