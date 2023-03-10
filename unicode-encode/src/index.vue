<template>
  <div class="Encode">
    <h-vertical-transform
      :sample-data="sampleData"
      :transform-func="encode"
      layout-type="equally"
      :back-transform-func="decode"
    >
      <a-checkbox
        v-model:checked="donTConvertAll"
        style="margin: 0 0 15px"
        @change="onOptionsChange"
        >{{ $t('unicodeEncode.donTConvertAll') }}</a-checkbox
      >
    </h-vertical-transform>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const donTConvertAll = ref(true)

const sampleData = '氦三科技'

const encode = ref<(str: string) => string>((str: string): string => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const code = char.charCodeAt(0)
    if (donTConvertAll.value) {
      if (code < 128) {
        result += char
        continue
      }
    }
    result += '\\u' + String(code.toString(16)).padStart(4, '0')
  }
  return result
})

function decode(str: string): string {
  // unicode 编码范围为 \u000 - \ufffff
  const unicodeReg = /\\u([0-9a-fA-F]{3,5})/g
  return str.replaceAll(unicodeReg, (match, dec) => {
    // 循环判断输出，如果不存在自动减位
    for (let i = dec.length; i > 2; i--) {
      const string = String.fromCodePoint(parseInt(dec.slice(0, i), 16))
      if (string) {
        return string + dec.slice(i, dec.length)
      }
    }
    return match
  })
}

function onOptionsChange() {
  encode.value = (str: string): string => {
    let result = ''
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      const code = char.charCodeAt(0)
      if (donTConvertAll.value) {
        if (code < 128) {
          result += char
          continue
        }
      }
      result += '\\u' + String(code.toString(16)).padStart(4, '0')
    }
    return result
  }
}
</script>

<style scoped lang="less"></style>
