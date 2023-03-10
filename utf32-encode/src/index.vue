<template>
  <h-vertical-transform :transform-func="encode" :back-transform-func="decode" />
</template>

<script setup lang="ts">
import { UTF32Char, UInt32 } from 'utf32char'

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
