<template>
  <h-layout-single mode="middle" :width="1280">
    <div class="wrapper">
      <div v-for="(item, index) in baseList" :key="item" class="item">
        <div class="header">
            <span v-if="index !== 4" class="title">
              {{ t(`${item}`) }} ({{ nameObj[item] }})</span
            >
          <span v-else>
              {{ t('base') }}:
              <a-select
                  ref="select"
                  :value="baseList[4]"
                  style="width: 120px"
                  size="small"
                  @change="conversionChange"
              >
                <a-select-option
                    v-for="item in rangeList"
                    :key="item"
                    :value="item"
                >{{ item }}</a-select-option
                >
              </a-select>
            </span>
        </div>
        <div class="content">
          <a-input
              :class="hasError(inputList[index], item) && `error`"
              :value="inputList[index]"
              @change="(e) => change(e, item, index)"
          />
          <a-button class="copybtn" @click="copy(inputList[index])"
          >{{ t('copy') }}
          </a-button>
        </div>
      </div>
    </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import { range, get } from 'lodash'
import { convertBase } from 'simple-base-converter'
import { useI18n } from 'vue-i18n'
import messages from './lang.json'

const { t } = useI18n({
  locale: window.$he3.lang,
  messages
})

const rangeList = range(2, 37)
const inputList = ref(['1010', '12', '10', 'a', 'a'])
const baseList = ref([2, 8, 10, 16, 32])
const nameObj = {
  2: 'Binary',
  8: 'Octal',
  10: 'Decimal',
  16: 'Hex',
}

function hasError(value: string, base: number) {
  if (value === '') {
    return false
  }
  try {
    convertBase(value, base, 10)
  } catch (e) {
    return true
  }
  return false
}

function conversionChange(e: number) {
  baseList.value.splice(4, 1, e)
  let value = inputList.value[4]
  change(value, e, 4)
}

function change(e: any, item: number, index: number) {
  let base = ''
  const value = get(e, 'target.value', e)
  inputList.value[index] = value
  if (value === '') {
    inputList.value = ['', '', '', '', '']
    return
  }
  try {
    base = convertBase(value, item, 10)
  } catch (e) {
    return
  }
  inputList.value = baseList.value.map((item) => {
    return convertBase(base, 10, item).toString()
  })
}

function copy(value: string) {
  if (value) {
    $he3.copyText(value)
    $he3.message.success(t('copySuccess'))
  }
}
</script>

<style scoped lang="less">
.wrapper {
  .item {
    padding: 6px;

    .header {
      margin: 2px 0;

      .copybtn {
        margin-left: 20px;
      }
    }

    .content {
      display: flex;

      .copybtn {
        margin-left: 20px;
      }

      .error {
        border-color: red;
      }
    }
  }
}
</style>
