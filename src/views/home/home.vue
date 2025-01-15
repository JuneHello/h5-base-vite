<script lang="ts" setup>
import { agreementApi } from "@/api/modules/login";

const agreementList: any = ref([]);
const state: any = ref({
  rowData: {}
});

onMounted(() => {
  getAgreementInfo();
});

const getAgreementInfo = () => {
  agreementApi({
    type: `0`
  }).then((res: any) => {
    console.log("🚀 ~ getAgreementInfo ~ res:", res);
    agreementList.value = res || [];
    saveAgreement();
  });
};

const saveAgreement = async () => {
  const arr: any = [];
  agreementList.value.map((item: any) => {
    arr.push({
      ...item,
      productName: state.value.rowData.productName,
      productId: state.value.rowData.productId,
      platform: `1`
    });
  });
  state.value.showBoolean = false;
  // await saveAgreementApi({ value: arr });
};
</script>

<template>
  <div class="home">home</div>
  <van-button type="primary">主要按钮</van-button>
</template>

<style lang="scss" scoped></style>
