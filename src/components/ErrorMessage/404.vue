<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <van-cell title="展示弹出层" is-link @click="showPopup" />
      <van-popup v-model:show="show" :style="{ padding: '64px' }">内容</van-popup>
      <van-button type="primary" size="small" v-auth="data">触发事件</van-button>
      <van-button v-reclick:200="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
import { ref } from "vue";
import { showToast } from "vant";

const show = ref(false);
const showPopup = () => {
  show.value = true;
};
const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
const throttleClick = () => {
  showToast("我是节流按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
