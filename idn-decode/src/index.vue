<template>
  <h-layout-single mode="middle" :width="1280">
    <div>
      <h-multiline-input
        v-model="input"
        :title="$t('input')"
        @change="decode" />
    </div>
    <h-multiline
      :value="output"
      :title="$t('output')" />
  </h-layout-single>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { likeIDN } from './util.ts';

import { toUnicode } from 'punycode';

const EXAMPLE_IDN_DOMAIN = 'xn--ehqy74e.com';
const input = ref(EXAMPLE_IDN_DOMAIN);
const output = ref('');

onMounted(() => {
  $he3.getLastClipboard().then((res) => {
    if (likeIDN(res)) {
      input.value = res;
      decode();
      $he3.onUseClipboardValue();
    }
  });
  decode();
});
function decode() {
  output.value = toUnicode(input.value);
}
</script>

<style scoped lang="less"></style>
