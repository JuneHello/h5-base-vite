<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <van-button type="primary" size="small" v-auth="data">触发事件</van-button>
      <van-button v-reclick:200="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from "vue";
import { showToast } from "vant";
defineOptions({
  name: "404"
});
const data = ref<string>("我是被复制的内容");
const throttleClick = () => {
  showToast("我是节流按钮触发的事件");
};
</script>

<style scoped lang="scss">
@use "./index";
</style>
