<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="input">
        <h-multiline-input
          v-model="inputValue"
          :title="$t('input_tip')"
          @change="decode"
          select-all-on-mount
        />
      </div>
      <h-multiline-result
        v-model:result="outputValue"
        :result-desc="$t('result_tip')"
      />
  </h-layout-single>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import utf8 from 'utf8'
import {isUtf8Encoded} from './util'

const inputValue = ref(
  '\\x41\\x20\\x46\\x72\\x65\\x65\\x2c\\x20\\x4d\\x6f\\x64\\x65\\x72\\x6e\\x20\\x54\\x6f\\x6f\\x6c\\x62\\x6f\\x78\\x0a\\x42\\x75\\x69\\x6c\\x74\\x20\\x66\\x6f\\x72\\x20\\x44\\x65\\x76\\x65\\x6c\\x6f\\x70\\x65\\x72\\x73\\x2e',
)
const outputValue = ref('')
const htmlRegExp = /&#(\d*);/

onMounted(() => {
  $he3.getLastClipboard().then((res) => {
    if (isUtf8Encoded(res)) {
      inputValue.value = res;
      decode();
      $he3.useClipboardCallBack();
    }
  });
})

const decode = () => {
  let raw = inputValue.value
  if (htmlRegExp.test(raw)) {
    raw = htmlIntoHex(raw)
  }
  try {
    outputValue.value = utf8.decode(eval("'" + raw + "'"))
  } catch (error) {
    $he3.message.error(error.toString())
  }
}

function htmlIntoHex(str: string): string {
  return str.replace(
    /&#(\d+);/g,
    (match, dec) => '\\x' + parseInt(dec).toString(16),
  )
}

setTimeout(() => {
  decode()
})
</script>

<style scoped lang="less"></style>
