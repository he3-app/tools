<template>
  <h-layout-single mode="middle" :width="1280">
    <div>
    <h-multiline-input
        select-all-on-mount
        v-model="input"
        :title="$t('input')"
        @change="handleChange"
      />
      <h-multiline
        :value="output"
        :title="$t('output')"
      />
    </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue"
import {utf7Encode} from "./utf7.js"
const EXAMPLE_STR = `A Free, Modern Toolbox
Built for Developers.
`
const input = ref(EXAMPLE_STR)
const output = ref('')

onMounted(() => {
  handleChange()
})

function handleChange() {
  output.value = utf7Encode(input.value)
}
</script>

<style scoped lang="less"></style>
