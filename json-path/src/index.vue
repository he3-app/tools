<template>
  <h-layout-horizontal mode="middle">
    <template #left class="left">
      <h-multiline-input
          v-model="input"
          autofocus
          class="input"
          :title="t('input')"
          :code="true"
          @change="evaluate"
      />
    </template>
    <template #right>
      <div>
        <p class="option">
          <span>{{ t('path') }}</span>
          <a-input v-model:value="path" class="opt" @change="evaluate"/>
        </p>
        <h-multiline-result :result="output" :result-desc="t('output')"/>
      </div>
    </template>
  </h-layout-horizontal>
</template>
<script setup>
import jp from 'jsonpath'
import messages from './lang.json'
import { useI18n } from 'vue-i18n'
const {t} = useI18n({
  locale: window.$he3.lang,
  messages
})
import {onMounted, ref} from 'vue';

const input = ref(`{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
         "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`)
const output = ref('')
const path = ref('$..author')

function isJson(text) {
  if (text.length < 30) {
    return false
  }

  if (!text.trim().startsWith('{') && !text.trim().startsWith('\\{')) {
    return false
  }

  try {
    JSON.parse(text)
  } catch (e) {
    return false
  }
  return true
}

onMounted(() => {
  $he3.getLastClipboard().then(res => {
    if (isJson(res)) {
      inputValue.value = res
      $he3.onUseClipboardValue()
    }
    evaluate()
  })
})

const evaluate = () => {
  if (input.value.length <= 0) {
    window.$he3.message.warn(t("inputJson"))
    return
  }

  if (path.value.length <= 0) {
    window.$he3.message.warn(t("inputJsonPath"))
    return
  }
  output.value = jp.query(JSON.parse(input.value), path.value).join('\n')
}

</script>

<style scoped lang="less">
.left {
  height: 100%;
  overflow-y: scroll;
}
</style>
