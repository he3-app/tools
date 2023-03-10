<template>
    <h-layout-single mode="middle" :width="1280">
      <div class="jwt-parse">
        <h-multiline-input
            v-show="!$he3.renderOnSearch"
            v-model="inputValue"
            :title="t('input_tip')"
            class="input"
            id="jwt-parse-textarea"
            @change="parse"
            select-all-on-mount
        />
        <div class="result">
          <div class="result-son">
            {{ `Header:` }}
            <h-k-v-result  :result="outputHeader" model="json" />
          </div>
          <div class="result-son">
            {{ `Payload:` }}
            <h-k-v-result  :result="outputValue" model="json" />
          </div>
        </div>
      </div>
    </h-layout-single>
</template>

<script setup lang="ts">
import jwtDecode from 'jwt-decode'
import {onMounted, ref} from "vue";
import messages from './lang.json'

import {isJWT} from "./util";

const $he3 = window.$he3
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  locale: window.$he3.lang,
  messages
})

const inputValue = ref(
    'eyJhbGciOiJIUzM4NCJ9.ewogICAgImFkbWluIjogInRydWUiLAogICAgInVzZXIiOiAiSGUzIiwKICAgICJleHAiOiAiMTY2Njg2NTY4MyIKfQ.pEH9dvF7Z96OwQeIrfrCNxZCuluX1G6WDXXFLdTUZURVg-7Mdg7iZG0QzadxBqiM',
)

const outputHeader = ref({})
const outputValue = ref({})
const alg = ref('HS256')

onMounted(() => {
  $he3.getLastClipboard().then(res => {
    if (isJWT(res)) {
      inputValue.value = res
      parse()
      $he3.onUseClipboardValue()
    }
  })
})

const parse = () => {
  try {
    outputHeader.value = {
      ...jwtDecode(inputValue.value, { header: true }),
    }
    outputValue.value = {
      ...jwtDecode(inputValue.value),
    }
  } catch (error) {
    window.$he3.message.warn((error as any).toString())
  }
}

setTimeout(() => {
  parse()
})
</script>
<style scoped lang="less">
.jwt-parse {
  .input {
    margin-bottom: 30px;
  }

  .result {
    display: flex;
    width: 100%;
    height: 170px;
    justify-content: space-between;
    .result-son {
      width: 49%;
      height: 100%;
    }
  }
}
</style>

