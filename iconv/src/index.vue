<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="iconv">
        <a-input-group size="large">
          <a-space>
            <span>{{ $t('sourceEncode') }}</span>
            <a-select
              v-model:value="inputEncoding"
              :options="encodingOptions"
            />
            <a-upload :before-upload="handleSelected" :max-count="1">
              <a-button type="primary"> {{ $t('select') }} </a-button>
            </a-upload>
          </a-space>
        </a-input-group>

        <a-textarea v-model:value="inputText" class="textarea" />
        <a-space>
          <span>{{ $t('targetEncode') }}</span>

          <a-select
            v-model:value="outputEncoding"
            :options="encodingOptions"
            @change="handleConvert"
          />

          <a :href="downloadURL" download="text">
            <a-button :disabled="downloadDisabled" type="primary">
              {{ $t('save') }}
            </a-button>
          </a>
        </a-space>
      </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import { message, UploadProps } from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue'
import {ref, watch} from "vue"
const multiLineText = `A Free, Modern Toolbox Built for Developers.`

const fromContents = ref<ArrayBuffer>(new ArrayBuffer(0))
const inputText = ref('')
const inputEncoding = ref('utf8')
const outputEncoding = ref('utf8')
// Supported Encodings https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
// Lots of encodings. Need a better way to select.
const encodingOptions = ref<SelectProps['options']>([
  { value: 'utf8', label: 'UTF-8' },
  { value: 'ascii', label: 'ASCII' },
  { value: 'UTF7', label: 'UTF-7' },
  { value: 'UTF-16', label: 'UTF-16' },
  { value: 'UTF-32', label: 'UTF-32' },
  { value: '874', label: 'Windows 874' },
  { value: '1250', label: 'Windows 1250' },
  { value: '1251', label: 'Windows 1251' },
  { value: '1252', label: 'Windows 1252' },
  { value: '1253', label: 'Windows 1253' },
  { value: '1254', label: 'Windows 1254' },
  { value: '1255', label: 'Windows 1255' },
  { value: '1256', label: 'Windows 1256' },
  { value: '1257', label: 'Windows 1257' },
  { value: '1258', label: 'Windows 1258' },
  { value: 'ISO-8859-1', label: 'ISO-8859-1' },
  { value: 'ISO-8859-2', label: 'ISO-8859-2' },
  { value: 'ISO-8859-3', label: 'ISO-8859-3' },
  { value: 'ISO-8859-4', label: 'ISO-8859-4' },
  { value: 'ISO-8859-5', label: 'ISO-8859-5' },
  { value: 'ISO-8859-6', label: 'ISO-8859-6' },
  { value: 'ISO-8859-7', label: 'ISO-8859-7' },
  { value: 'ISO-8859-8', label: 'ISO-8859-8' },
  { value: 'ISO-8859-9', label: 'ISO-8859-9' },
  { value: 'ISO-8859-10', label: 'ISO-8859-10' },
  { value: 'ISO-8859-11', label: 'ISO-8859-11' },
  { value: 'ISO-8859-12', label: 'ISO-8859-12' },
  { value: 'ISO-8859-13', label: 'ISO-8859-13' },
  { value: 'ISO-8859-14', label: 'ISO-8859-14' },
  { value: 'ISO-8859-15', label: 'ISO-8859-15' },
  { value: 'ISO-8859-16', label: 'ISO-8859-16' },
  { value: '437', label: 'CP 437' },
  { value: '850', label: 'CP 850' },
  { value: '852', label: 'CP 852' },
  { value: '865', label: 'CP 865' },
  { value: '866', label: 'CP 866' },
  { value: 'macroman', label: 'Mac Roman' },
  { value: 'koi8-r', label: 'KOI8-R' },
  { value: 'koi8-u', label: 'KOI8-u' },
  { value: 'koi8-ru', label: 'KOI8-Ru' },
  { value: 'koi8-t', label: 'KOI8-t' },
  { value: 'Shift_JIS', label: 'Shift JIS' },
  { value: 'EUC-JP', label: 'EUC-JP' },
  { value: 'GB2312', label: 'GB2312' },
  { value: 'GBK', label: 'GBK' },
  { value: 'GB18030', label: 'GB18030' },
  { value: 'EUC-KR', label: 'EUC-KR' },
  { value: 'Big5', label: 'Big5' },
  { value: 'Big5-HKSCS', label: 'Big5-HKSCS' },
])
const downloadURL = ref('')
const downloadDisabled = ref(true)

// The convert button is not needed actually.
// Because the download URL is updated automatically every time
// the input or the output encoding changes.
function handleConvert() {
  convert(inputText.value, outputEncoding.value)
}

// --------------------------------------------------------
// Watch the output encoding changes and execute converting
// --------------------------------------------------------
function convert(text: string, encoding: string) {
  try {
    let res = $he3.encodeString(text, encoding)
    const blob = new Blob([res])
    const url = URL.createObjectURL(blob)
    downloadURL.value = url
  } catch (error) {
    if (error instanceof Error) {
      $he3.message.error(error.message)
    }
  }
  downloadDisabled.value = false
}
watch(inputText, (newText) => {
  convert(newText, outputEncoding.value)
})
watch(outputEncoding, (newEncoding) => {
  convert(inputText.value, newEncoding)
})

// ------------------------------------------------------------
// Watch the input text/encoding changes and read it's contents
// ------------------------------------------------------------
function read(ab: ArrayBuffer, encoding: string) {
  try {
    inputText.value = $he3.decodeToString(ab, encoding)
  } catch (error) {
    if (error instanceof Error) {
      $he3.message.error(error.message)
    }
  }
  handleConvert()
}
watch(fromContents, (newContents) => {
  read(newContents, inputEncoding.value)
})
watch(inputEncoding, (newEncoding) => {
  read(fromContents.value, newEncoding)
})

// Initialize the input text
inputText.value = multiLineText

// -----------------------------------------------
// Update the fromContents value when upload files
// -----------------------------------------------
const handleSelected: UploadProps['beforeUpload'] = (file: File) => {
  // Load the file into fromContents.value
  let reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = (e) => {
    if (e.target) {
      if (!(e.target.result instanceof ArrayBuffer)) {
        return
      }
      fromContents.value = e.target.result
    }
  }
  return false
}
</script>

<style scoped lang="less">
.iconv {
  > * {
    margin-top: 15px;
  }
  :deep(.ant-select-selection-item) {
    width: 100px;
  }
  .textarea {
    min-height: 280px;
  }
}
</style>
