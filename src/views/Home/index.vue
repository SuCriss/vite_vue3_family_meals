<template>
  <h1>{{ msg }}</h1>
  <Button type="primary">主要按钮</Button>
</template>

<script lang="ts">
import {
  toRefs,
  reactive,
  defineComponent,
  toRaw,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { Button } from "vant";
export default defineComponent({
  name: "Home",
  components: {
    Button,
  },
  setup: () => {
    const store = useStore();
    const axios =
      getCurrentInstance()?.appContext.config.globalProperties.$axios;
    console.log("axios", axios);
    axios
      .request({
        url: "/classifies",
        method: "get",
        data: { id: "33894312" },
      })
      .then((res: any) => {
        console.log("res", res);
      });
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
