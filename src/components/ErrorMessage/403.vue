<template>
  <div class="not-container">
    <img src="@/assets/images/403.png" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <div type="primary" @click="router.back">返回上一页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "403"
});
const router = useRouter();
</script>

<style scoped lang="scss">
@use "./index";
</style>
