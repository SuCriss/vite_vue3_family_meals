<template>
  <div class="loginWrapper">
    <div class="loginForm">
      <div class="avator">
        <div class="water_wave"></div>
        <div class="water_wave"></div>
        <div class="water_wave"></div>
        <van-image
            round
            fit="cover"
            width="80px"
            height="80px"
            :src="state.srcImg"
          />
      </div>
      <van-form @failed="onFailed">
        <van-cell-group inset>
          <!-- 通过 pattern 进行正则校验 -->
          <van-field
            v-model="state.value1"
            name="phone"
            label="手机号码"
            placeholder="请输入手机号码"
            :rules="[{ pattern, message: '手机号码有误请重新输入' }]"
          />
          <!-- 通过 validator 进行函数校验 -->
          <van-field
            v-model="state.value2"
            name="vaildate_code"
            label="验证码"
            placeholder="请输入验证码"
            :rules="[{ validator, message: '验证码有误请重新输入' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs } from "vue";
import { Form, Field, CellGroup, Button, Image } from "vant";
import imgUrl from '@/assets/logo.png';
export default defineComponent({
  name: "Home",
  components: {
    vanForm: Form,
    vanField: Field,
    vanCellGroup: CellGroup,
    vanButton: Button,
    vanImage: Image,
  },
  setup: () => {
    // const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
    // onMounted(() => {
    //   axios.getDemo({ phone: "17689475843", captcha: "2482" })
    //     .then((res: any) => {
    //       console.log(res);
    //     }).catch((err:any)=>{
    //       console.log(err)
    //     });
    // });
    const state = reactive({
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      srcImg:imgUrl
    });
    const pattern =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validator = (val: any) => /^([0-9]{4}|[0-9]{6})$/.test(val);

    const onFailed = (errorInfo: any) => {
      console.log("failed", errorInfo);
    };

    return {
      state,
      pattern,
      onFailed,
      validator,
    };
  },
});
</script>

<style scoped>
.loginWrapper {
  width: 100%;
  height: 100%;
  background: #ff0000d1;
}
.avator {
  width: 100%;
  position: relative;
  height: 200px;
  padding: 120px 0 60px;
}

.loginWrapper .water_wave {
  position: absolute;
  opacity: 1;
  left: 0;
  right: 0;
  top: 118px;
  margin: auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid rgba(207, 112, 112, 0.7);
  animation: routerView 6s linear 0s infinite;
}
.loginWrapper .water_wave:nth-child(2) {
  animation-delay: 2s;
}
.loginWrapper .water_wave:nth-child(3) {
  animation-delay: 4s;
}


@keyframes routerView {
  0% {
    opacity: 0.1;
    transform: scale(1);
  }
  5%{
    opacity: 0.3;
    transform: scale(1.2);
  }
  25% {
    opacity: 0.5;
    transform: scale(1.5);
  }
  50% {
    opacity: 0.7;
    transform: scale(2.5);
  }
  75% {
    opacity: 0.5;
    transform: scale(3);
  }
  100% {
    opacity: 0.1;
    transform: scale(3.5);
  }
}
</style>
