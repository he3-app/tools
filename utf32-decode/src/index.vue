<template>
  <h-vertical-transform
    :transform-func="decode"
    :sample-data="EXAMPLE_DATA"
    :input="input"
    :back-transform-func="encode"
  />
</template>

<script setup lang="ts">
import { UTF32Char, UInt32 } from 'utf32char'
import {ref,onMounted} from 'vue'
import {isUtf32Encoded} from './util'

const input = ref('')

const EXAMPLE_DATA =
  'U+00000041U+00000020U+00000046U+00000072U+00000065U+00000065U+0000002cU+00000020U+0000004dU+0000006fU+00000064U+00000065U+00000072U+0000006eU+00000020U+00000054U+0000006fU+0000006fU+0000006cU+00000062U+0000006fU+00000078U+0000000aU+00000042U+00000075U+00000069U+0000006cU+00000074U+00000020U+00000066U+0000006fU+00000072U+00000020U+00000044U+00000065U+00000076U+00000065U+0000006cU+0000006fU+00000070U+00000065U+00000072U+00000073U+0000002eU+0000000a'

onMounted(() => {
  $he3.getLastClipboard().then((res) => {
    if (isUtf32Encoded(res)) {
      input.value = res;
      $he3.useClipboardCallBack();
    }
  });
})

function decode(str: string): string {
  let res = ''
  let arr = str.split('U+')
  for (let i = 0; i < arr.length; i++) {
    let numStr = arr[i]
    if (numStr === '') {
      continue
    }
    let num = parseInt(numStr, 16)
    let u32num = new UInt32(num)
    let ch = UTF32Char.fromUInt32(u32num)
    res += ch.toString()
  }
  return res
}

function encode(str: string): string {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    let ch = new UTF32Char(str[i])
    let enc = ch.toNumber().toString(16)
    let padding = 8 - enc.length
    for (let j = 0; j < padding; j++) {
      enc = '0' + enc
    }
    res += 'U+' + enc
  }
  return res
}
</script>

<style scoped lang="less"></style>
