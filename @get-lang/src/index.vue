<template>
  <h-layout-single mode="middle" :width="1280">
    <div class="header">
      <a-input v-model:value="input"/>
      <a-button tpye="primary" @click="handleClick" class="button">get</a-button>
    </div>
    <h-multiline :value="text" result-desc="输出" />
  </h-layout-single>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import data from './data.json'
const $he3 = window.$he3
const input = ref("");
const text = ref("");

function handleClick() {
  console.log(input.value)
  text.value = input.value;

  let returnObj = {};
  Object.keys(data).forEach((key) => {
    returnObj[key] = _.get(data, [key, input.value], {});
  })
  text.value = JSON.stringify(returnObj, null, 2);
}


</script>
<style scoped lang="less">

.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button{
  margin-left: 20px;
}

</style>
