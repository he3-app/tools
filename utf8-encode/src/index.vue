<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="input">
        <h-multiline-input
          v-model="inputValue"
          :title="$t('input_tip')"
          @change="encode"
          select-all-on-mount
        />
      </div>
      <a-radio-group
        v-model:value="format"
        style="margin-top: 10px"
        option-type="button"
        :options="formatOptions"
        @change="encode"
      />
      <h-multiline
        :value="outputValue"
        :title="$t('result_tip')"
      />
  </h-layout-single>
</template>

<script setup lang="ts">
import utf8 from 'utf8'
import {ref} from 'vue'

const format = ref('hex')
const formatOptions = [
  { label: 'HEX', value: 'hex' },
  { label: 'HTML', value: 'html' },
]
const inputValue = ref(`A Free, Modern Toolbox
Built for Developers.`)
const outputValue = ref('')

const encode = () => {
  let result = utf8.encode(inputValue.value)
  let ret = ''
  for (let n = 0; n < result.length; n++) {
    ret += formatSingle(result[n])
  }
  outputValue.value = ret
}

function formatSingle(ch: string): string {
  switch (format.value) {
    case 'hex':
      let t = ch.charCodeAt(0).toString(16)
      return t.length === 1 && (t = '0' + t), '\\x' + t
    case 'html':
      return '&#' + ch.charCodeAt(0).toString() + ';'
  }
  return ch
}

setTimeout(() => {
  encode()
})
</script>

<style scoped lang="less"></style>
