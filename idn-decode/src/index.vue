<template>
  <h-layout-single mode="middle" :width="1280">
    <div>
      <h-multiline-input
        v-model="input"
        :title="$t('idnEncoding.input')"
        @change="decode" />
    </div>
    <h-multiline-result
      :result="output"
      :result-desc="$t('idnEncoding.output')" />
  </h-layout-single>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { likeIDN } from './util.ts';

import { toUnicode } from 'punycode';

const EXAMPLE_IDN_DOMAIN = 'xn--ehqy74e.com';
const input = ref(EXAMPLE_IDN_DOMAIN);
const output = ref('');
const props = defineProps<{
  clipboardValue?: any;
}>();

const emit = defineEmits(['acceptClipboardCb']);
onMounted(async () => {
  $he3.getLastClipboard().then((res) => {
    if (likeIDN(res)) {
      input.value = res;
      decode();
      $he3.useClipboardCallBack();
    }
  });
});
function decode() {
  output.value = toUnicode(input.value);
}
</script>

<style scoped lang="less"></style>
