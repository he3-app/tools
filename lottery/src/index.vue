<template>
  <H-single-layout mode="middle" :width="1280">
    <h-multiline-input v-model="input" title="Please input candidates here:" />
    <p>Please input count:</p>
    <a-space>
      <a-input-number v-model:value="count" min="1" />
      <a-button type="primary" @click="lottery()">lottery</a-button>
    </a-space>
    <h-multiline :value="result" :title="Congrats!" />
  </H-single-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const input = ref("peace\nlove\nhappiness\nhealth");
const count = ref(1);
const result = ref("");

function lottery() {
  let inputArr = input.value.split("\n");
  inputArr = inputArr.filter(function (item) {
    return item.length > 0;
  });
  const resultArr = [];
  for (let i = 0; i < count.value; i++) {
    const c = Math.floor(Math.random() * inputArr.length);
    resultArr.push(inputArr[c]);
    inputArr.splice(c, 1);
  }
  result.value = resultArr.join("\n");
}
</script>
