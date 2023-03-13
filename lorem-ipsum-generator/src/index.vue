<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="lorem-ipsum-generator">
        <div class="lorem-ipsum-generator-params">
          <a-space>
            {{ t('generate') }}
            <a-input-number
              v-model:value="inputNum"
              :min="1"
              @change="handleGenerate"
            />
            <a-select
              v-model:value="selectedMetrics"
              class="select"
              :options="metricsOptions"
              @change="handleGenerate"
            />
            <a-button type="primary" @click="handleGenerate">{{
              t('refresh')
            }}</a-button>
          </a-space>
        </div>
        <div class="lorem-ipsum-generator-output">
          <h-multiline
            :title="t('title')"
            :value="outputText"
          />
        </div>
      </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue/lib/vc-select'
import { LoremIpsum } from 'lorem-ipsum'
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});


// Initialize example data
onMounted(() => {
  inputNum.value = 5
  selectedMetrics.value = 'paragraph'
  handleGenerate()
})

const inputNum = ref(5)
const selectedMetrics = ref('paragraph')
const outputText = ref('')

const metricsOptions = ref<SelectProps['options']>([
  {
    value: 'word',
    label: t('options.word'),
  },
  {
    value: 'sentence',
    label: t('options.sentence'),
  },
  {
    value: 'paragraph',
    label: t('options.paragraph'),
  },
])

function handleGenerate() {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  })

  let newOutputText = ''
  switch (selectedMetrics.value) {
    case 'word':
      newOutputText = lorem.generateWords(inputNum.value)
      break
    case 'sentence':
      newOutputText = lorem.generateSentences(inputNum.value)
      break
    case 'paragraph':
      newOutputText = lorem.generateParagraphs(inputNum.value)
      break
    default:
      return
  }
  outputText.value = newOutputText
}
</script>

<style scoped lang="less">
.lorem-ipsum-generator {
  .select {
    width: 150px;
  }
}
</style>
