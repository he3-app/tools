<template>
  <div>
    <Transform @change="handleChange" @resultChange="resultChange" @mounted="handleMounted" />
  </div>
</template>
<script setup>
// 临时Transform组件
import Transform from "./Transform.vue";
import unescapeJS from 'unescape-js'

defineProps({
  msg: String,
})

const sample = `{\"你好\"}`

function jsEscape(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case '\0':
        return '\\0'
      case '\x08':
        return '\\b'
      case '\x09':
        return '\\t'
      case '\x1a':
        return '\\z'
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\v':
        return '\\v'
      case '\f':
        return '\\f'
      case '"':
      case "'":
      case '\\':
      case '%':
        // prepends a backslash to backslash, percent, and double/single quotes
        return '\\' + char
    }
  })
}

function handleChange(inputValue) {
  if (!inputValue.value) {
    return ''
  }
  return jsEscape(inputValue.value)
}

function resultChange(outputValue) {
  if (!outputValue.value) {
    return ''
  }

  return unescapeJS(outputValue.value)
}

function handleMounted(inputValue) {
  inputValue.value = sample
}
</script>

<style scoped>
</style>
