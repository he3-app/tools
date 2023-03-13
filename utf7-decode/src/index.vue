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
import {utf7Decode} from "./utf7.js"

const EXAMPLE_ENCODED = `A+ACA-Free,+ACA-Modern+ACA-Toolbox+AAo-Built+ACA-for+ACA-Developer.+AAo-`
const input = ref(EXAMPLE_ENCODED)
const output = ref('')

onMounted(() => {
  handleChange()
})

function handleChange() {
  output.value = utf7Decode(input.value)
}
</script>

<style scoped lang="less"></style>
