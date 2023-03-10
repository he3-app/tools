<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="input">
        <h-multiline-input
        v-model="input"
        :title="$t('input')"
        @change="handleChange"
        select-all-on-mount
        />
      </div>
      <h-multiline-result
      :result="output"
        :result-desc="$t('output')"
      />
  </h-layout-single>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'

const EXAMPLE_STR = `A Free, Modern Toolbox
Built for Developers.
`
const input = ref(EXAMPLE_STR)
const output = ref('')

onMounted(() => {
  handleChange()
});

function handleChange() {
  let inp = input.value
  let res = ''
  for (let i = 0; i < inp.length; i++) {
    let temp = inp[i].charCodeAt(0).toString(16)
    if (temp.length === 1) {
      temp = '0' + temp
    }
    res += '\\u{' + temp + '}'
  }
  output.value = res
}
</script>

<style scoped lang="less"></style>
