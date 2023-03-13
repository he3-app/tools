<template>
  <Layout5 :max-width="800">
    <template #one>
      <span>
        {{ $t('sourceComplementAnticodeCalculator.selectNumber') }}:
        <a-radio-group
          v-model:value="variant[0]"
          option-type="button"
          size="middle"
          :options="variantOptions"
          @change="onOptionsChange"
        />
      </span>
      <div class="header">
        <span> {{ $t('sourceComplementAnticodeCalculator.integer') }}：</span>
      </div>
      <div class="content">
        <Input
          style="height: 30px; padding: 5px 10px; margin-top: 10px"
          :class="hasError(inputValue) && `error`"
          :value="inputValue"
          @change="(e) => change(e)"
        />
      </div>
      <div v-for="(item, index) in baseList2" :key="item" class="item">
        <div class="content">
          <SingleLineResult
            :result="`${inputListOut[index]}`"
            :result-desc="$t(`sourceComplementAnticodeCalculator.${index}`)"
            size="big"
            style="width: 800px"
          />
        </div>
      </div>
    </template>
  </Layout5>
</template>
<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { get, toString } from 'lodash'
import { ref } from 'vue'
import { Layout5, SingleLineResult } from '@/hui'
import JudgeType from '@/utils/judgeType'
import { i18n } from '@/main'
const props = defineProps<{
  clipboardValue?: JudgeType
  renderOnSearch?: boolean
}>()

const emit = defineEmits(['acceptClipboardCb'])

onMounted(() => {
  if (props.clipboardValue?.isNumber()) {
    let value = parseInt(props.clipboardValue.getOriginData())
    emit('acceptClipboardCb')
    change(value)
  }
  if (props.clipboardValue?.isHex()) {
    try {
      let value = parseInt(props.clipboardValue.getOriginData(), 16)
      change(value)
      emit('acceptClipboardCb')
    } catch (e) {}
  }
})

const inputValue = ref('0')
const variant = ref([
  i18n.global.t(`sourceComplementAnticodeCalculator.8`),
  i18n.global.t(`sourceComplementAnticodeCalculator.16`),
  i18n.global.t(`sourceComplementAnticodeCalculator.32`),
])
const bit = ref('8位')
const variantOptions = [
  {
    label: i18n.global.t(`sourceComplementAnticodeCalculator.8`),
    value: i18n.global.t(`sourceComplementAnticodeCalculator.8`),
  },
  {
    label: i18n.global.t(`sourceComplementAnticodeCalculator.16`),
    value: i18n.global.t(`sourceComplementAnticodeCalculator.16`),
  },
  {
    label: i18n.global.t(`sourceComplementAnticodeCalculator.32`),
    value: i18n.global.t(`sourceComplementAnticodeCalculator.32`),
  },
]
const baseList2 = ref([10, 2, 16])
const inputListOut = ref([
  '+0: 0000000    -0: 1000000',
  '+0: 0000000    -0: 1111111',
  '+0: 0000000    -0: 0000000',
])
//原码-反码-补码
let [true_form, inverse_code, com_rep] = [
  inputListOut.value[0],
  inputListOut.value[1],
  inputListOut.value[2],
]
let flag = false
function onOptionsChange(e: any) {
  bit.value = e.target.value
  change(inputValue.value)
}
function hasError(value: string) {
  let selectedBit = parseInt(bit.value)
  let ini_number: number = parseInt(value)
  if (ini_number.toString() == '') {
    return true
  }
  switch (selectedBit) {
    case 8:
      if (ini_number < -128 || ini_number > 127) {
        return true
      }
      break
    case 16:
      if (ini_number < -32768 || ini_number > 32767) {
        return true
      }
      break
    case 32:
      if (ini_number < -2147483648 || ini_number > 2147483647) {
        return true
      }
      break
  }
  return false
}
function change(e: any) {
  const ini_number = get(e, 'target.value', e)
  let selectedBit = parseInt(bit.value)
  flag = false
  inputValue.value = ini_number.toString()
  switch (selectedBit) {
    case 8:
      if (ini_number < -128 || ini_number > 127) {
        flag = true
      }
      break
    case 16:
      if (ini_number < -32768 || ini_number > 32767) {
        flag = true
      }
      break
    case 32:
      if (ini_number < -2147483648 || ini_number > 2147483647) {
        flag = true
      }
      break
  }
  if (flag) {
    return false
  }
  if (ini_number > 0) {
    true_form =
      inverse_code =
      com_rep =
        (Array(selectedBit).join('0') + parseInt(ini_number).toString(2)).slice(
          0 - selectedBit,
        )
  } else if (ini_number < 0) {
    if (
      (selectedBit == 8 && ini_number == -128) ||
      (selectedBit == 16 && ini_number == -32768) ||
      (selectedBit == 32 && ini_number == -2147483648)
    ) {
      true_form = inverse_code = i18n.global.t(
        `sourceComplementAnticodeCalculator.and`,
      )
    } else {
      true_form =
        '1' +
        (Array(selectedBit).join('0') + parseInt(ini_number).toString(2))
          .slice(1 - selectedBit)
          .replace('-', 0)
      inverse_code =
        '1' +
        (Array(selectedBit).join('0') + parseInt(ini_number).toString(2))
          .slice(1 - selectedBit)
          .replace('-', 0)
          .split('')
          .map((bit) => (bit == '0' ? '1' : '0'))
          .join('')
    }
    let result =
      parseInt(
        (Array(selectedBit).join('0') + parseInt(ini_number).toString(2))
          .slice(1 - selectedBit)
          .replace('-', 0)
          .split('')
          .map((bit) => (bit == '0' ? '1' : '0'))
          .join(''),
        2,
      ) + 1
    com_rep =
      '1' +
      (Array(selectedBit).join('0') + result.toString(2))
        .slice(1 - selectedBit)
        .replace('-', 0)
  } else if (ini_number == 0 && ini_number !== '') {
    true_form =
      '+0: ' +
      Array(selectedBit).join('0') +
      '    -0: ' +
      ('1' + Array(selectedBit).join('0')).slice(0, selectedBit - 1)
    inverse_code =
      '+0: ' +
      Array(selectedBit).join('0') +
      '    -0: ' +
      Array(selectedBit).join('1')
    com_rep =
      '+0: ' +
      Array(selectedBit).join('0') +
      '    -0: ' +
      Array(selectedBit).join('0')
  } else if (ini_number == '') {
    true_form = inverse_code = com_rep = ''
  }
  ;[inputListOut.value[0], inputListOut.value[1], inputListOut.value[2]] = [
    true_form,
    inverse_code,
    com_rep,
  ]
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.header {
  margin: 2px 0;
}
.content {
  display: flex;
  .error {
    border-color: red;
  }
}
</style>
