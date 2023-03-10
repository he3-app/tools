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
import {isUtf16Encoded} from './util'

const EXAMPLE_ENCODED = `\\u{41}\\u{20}\\u{46}\\u{72}\\u{65}\\u{65}\\u{2c}\\u{20}\\u{4d}\\u{6f}\\u{64}\\u{65}\\u{72}\\u{6e}\\u{20}\\u{54}\\u{6f}\\u{6f}\\u{6c}\\u{62}\\u{6f}\\u{78}\\u{0a}\\u{42}\\u{75}\\u{69}\\u{6c}\\u{74}\\u{20}\\u{66}\\u{6f}\\u{72}\\u{20}\\u{44}\\u{65}\\u{76}\\u{65}\\u{6c}\\u{6f}\\u{70}\\u{65}\\u{72}\\u{73}\\u{2e}\\u{0a}`
const input = ref(EXAMPLE_ENCODED)
const output = ref('')

onMounted(() => {
  $he3.getLastClipboard().then((res) => {
    if (isUtf16Encoded(res)) {
      input.value = res;
      handleChange();
      $he3.onUseClipboardValue();
    }
  });
  handleChange()
})

function handleChange() {
  const cc = /\\u\{([0-9a-f]{2,})\}/g

  let charCodes = []

  let it = input.value.matchAll(cc)
  for (let item = it.next(); !item.done; item = it.next()) {
    if (item.value.length >= 2) {
      charCodes.push(parseInt(item.value[1], 16))
    }
  }
  output.value = String.fromCharCode(...charCodes)
}
</script>

<style scoped lang="less"></style>
