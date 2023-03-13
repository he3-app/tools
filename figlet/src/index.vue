<template>
  <h-layout-single mode="middle" :width="1280">
      <a-form>
        <a-form-item :label="t('enterText')">
          <a-textarea
            v-model:value="inputValue"
            allow-clear
            @change="handleGenerate"
          />
        </a-form-item>
        <a-form-item :label="t('fontType')">
          <a-radio-group
            v-model:value="selectValue"
            class="parent"
            @change="handleGenerate"
          >
            <a-radio
              v-for="(item, index) in radioGroup"
              :key="index"
              button-style="solid"
              :value="item"
            >
              {{ item }}
            </a-radio>
          </a-radio-group>
          <a-select
            v-model:value="selectValue"
            show-search
            :options="options"
            :filter-option="filterOption"
            @change="handleGenerate"
          />
        </a-form-item>
      </a-form>
      <h-terminal-view :value="screen" />
  </h-layout-single>
</template>
<script lang="ts" setup>
import figlet from 'figlet'
import { fonts } from './util'
import {onMounted, ref} from "vue";
import messages from './lang.json'
import { SelectProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  locale: window.$he3.lang,
  messages
})
const inputValue = ref<string>('He3')
const selectValue = ref<string>('ANSI Shadow')
const options = ref<SelectProps['options']>(fonts)
const screen = ref<string>('')
  const radioGroup = [
  '3D Diagonal',
  'ANSI Shadow',
  'Alligator2',
  'Big Money-nw',
  'Block',
  'Digital',
  'Electronic',
  'Kban',
  'Speed',
  'Varsity',
]
const handleGenerate = () => {
  const searchValue: any = selectValue.value
  figlet.text(
    inputValue.value,
    {
      font: searchValue,
    },
    function (err, data) {
      screen.value = data || ''
    },
  )
}
onMounted(() => {
  figlet.text(
    'He3',
    {
      font: 'ANSI Shadow',
    },
    function (err, data) {
      screen.value = data || ''
    },
  )
})
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>
<style lang="less" scoped>
.handleBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
}
.iptHeader {
  padding-right: 10px;
  margin-left: 10px;
  font-weight: 600;
}
</style>
