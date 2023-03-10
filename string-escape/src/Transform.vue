<template>
  <HLayoutSplitPane class="TransForm">
    <template #left>
      <div class="TransForm-left-header">
        <slot :input-value="state.inputValue" name="leftHeader">
          <div class="TransForm-left-header-button">
            <!-- <TextCopyButton
              v-if="props.onResultChange"
              :copy-content="state.inputValue.value"
              type="primary"
              icon
            />
            <FileUploaderButton
              v-if="canChooseFile"
              :handle-file-selected="handleFileSelected"
              type="primary"
              icon
            /> -->
            <!-- &nbsp;&nbsp; -->
            <a-button
              v-for="item in leftConfiger.buttonList"
              :key="item"
              :type="item.type || 'primary'"
              size="small"
              @click="handleLeftClick($event, item.clickCallBack)"
            >
              <!-- <a-tooltip placement="bottom" :title="$t(item.tips ?? '')">
                {{ $t(item.text ?? '') }}
              </a-tooltip> -->
              <!-- <template #icon>
                <component :is="getIconFromAnt(item.icon || '')" />
              </template> -->
            </a-button>
          </div>
        </slot>
        <div v-if="leftState.error.value" class="error-message">
          <a-tooltip
            placement="bottom"
            :title="leftState.errorMessage.value"
            :overlay-style="{
              overflow: 'hidden',
              maxHeight: '500px',
            }"
          >
            <a-alert
              :message="leftState.errorMessage.value"
              type="error"
              show-icon
            />
          </a-tooltip>
        </div>
      </div>
      <div class="TransForm-left-content" @dragenter.prevent>
        <div v-if="leftState.error.value" class="error"></div>
        <HCodeEditor
          v-model="state.inputValue.value"
          v-model:isFocus="leftState.isFocus.value"
          :lang="leftConfiger.editorLang"
          :theme="leftConfiger.editorTheme"
          :placeholder="
            leftConfiger.placeholder 
          "
          class="TransForm-left-input"
          :autofocus="true"
          :error-line="leftState.errLine.value"
        />
      </div>
    </template>
    <template #right>
      <div class="TransForm-right-header">
        <slot :output-value="state.outputValue" name="rightHeader">
          <div class="TransForm-right-header-button">
            <!-- <TextCopyButton
              :copy-content="state.outputValue.value"
              type="primary"
              icon
            />
            <ContentSaverButton
              :size="'small'"
              :save-text="state.outputValue.value"
              icon
            /> -->
            <a-button
              v-for="(item, index) in rightConfiger?.buttonList"
              :key="index"
              size="small"
              :type="item.type"
              @click="handleRightClick($event, item.clickCallBack)"
            >
              <!-- <a-tooltip placement="bottom" :title="$t(item.tips ?? '')">
                {{ $t(item.text ?? '') }}
              </a-tooltip> -->
              <!-- <template #icon>
                <component :is="getIconFromAnt(item.icon || '')" />
              </template> -->
            </a-button>
          </div>
        </slot>
        <div v-if="rightState.error.value" class="error-message">
          <a-tooltip
            placement="bottom"
            :title="rightState.errorMessage.value"
            :overlay-style="{
              overflow: 'hidden',
              maxHeight: '500px',
            }"
          >
            <a-alert
              :message="rightState.errorMessage.value"
              type="error"
              show-icon
            />
          </a-tooltip>
        </div>
      </div>
      <div class="TransForm-right-content">
        <div v-if="rightState.error.value" class="error"></div>
        <HCodeEditor
          v-model="state.outputValue.value"
          v-model:isFocus="rightState.isFocus.value"
          :lang="rightConfiger.editorLang"
          :theme="rightConfiger.editorTheme"
          :placeholder="
            rightConfiger.placeholder 
          "
          class="TransForm-right-input"
          :autofocus="false"
          :error-line="rightState.errLine.value"
        />
      </div>
    </template>
  </HLayoutSplitPane>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, toRefs, watch } from 'vue'

interface Button {
  clickCallBack?: (
    event: MouseEvent,
    inputValue: Ref<string>,
    outputValue: Ref<string>,
  ) => void // 按钮点击回调
  text?: string // 按钮文本
  type?: any // 按钮类型
  icon?: string // 按钮icon
  tips?: string // 按钮tips
}
interface Configer {
  placeholder?: string
  buttonList?: Button[]
  editorLang?: any
  editorTheme?: any
}
const props = withDefaults(
  defineProps<{
    leftConfiger: Configer
    rightConfiger: Configer
    canChooseFile?: boolean
    onMounted?: (inputValue: Ref<string>, outputValue: Ref<string>) => void
    onChange?: (inputValue: Ref<string>) => string
    onResultChange?: (inputValue: Ref<string>) => string
    autoFill?: boolean
    autoFillType?: 'json' | 'yaml' | 'sql' | 'html' | 'xml' | 'escape-html' | ''
    clipboardValue?: any | null
  }>(),
  {
    leftConfiger: () => ({
      placeholder: '',
      leftTitle: 'Input',
      isTitleShow: true,
    }),
    rightConfiger: () => ({
      placeholder: '',
      rightTitle: 'Output',
      isTitleShow: true,
    }),
    onMounted: () => {},
    canChooseFile: true,
    autoFill: false,
    autoFillType: '',
    clipboardValue: null,
  },
)

const emit = defineEmits(['acceptClipboardCb'])

const state = toRefs(
  reactive({
    inputValue: '',
    outputValue: '',
  }),
)

/** 左侧编辑栏状态 */
const leftState = toRefs(
  reactive({
    isFocus: true,
    error: false,
    errorMessage: '',
    errLine: 0,
  }),
)

/** 右侧编辑栏状态 */
const rightState = toRefs(
  reactive({
    isFocus: false,
    error: false,
    errorMessage: '',
    errLine: 0,
  }),
)

watch(state.inputValue, () => {
  leftState.error.value = false
  leftState.errLine.value = 0
  if (props.onResultChange && !leftState.isFocus.value) {
    return
  }
  handleLeftChange()
})

watch(state.outputValue, () => {
  // 没有传参不执行
  if (!props.onResultChange) return
  // 清空错误状态
  rightState.error.value = false
  rightState.errLine.value = 0
  // 没有聚焦不执行
  if (!rightState.isFocus.value) return
  handleRightChange()
})

onMounted(async () => {
  props.onMounted && props.onMounted(state.inputValue, state.outputValue)
  if (props.autoFill) {
    if (props.autoFillType === 'json' && props.clipboardValue?.isJson()) {
      state.inputValue.value = props.clipboardValue.getOriginData()
      handleLeftChange()
      emit('acceptClipboardCb')
    }
    if (props.autoFillType === 'yaml' && props.clipboardValue?.isYaml()) {
      state.inputValue.value = props.clipboardValue.getOriginData()
      handleLeftChange()
      emit('acceptClipboardCb')
    }
    if (props.autoFillType === 'sql') {
      const res = props.clipboardValue?.likeSQL()
      if (res && props.clipboardValue) {
        state.inputValue.value = props.clipboardValue.getOriginData()
        handleLeftChange()
        emit('acceptClipboardCb')
      }
    }
    if (props.autoFillType === 'html') {
      const res = props.clipboardValue?.isHTML()
      if (res && props.clipboardValue) {
        state.inputValue.value = props.clipboardValue.getOriginData()
        handleLeftChange()
        emit('acceptClipboardCb')
      }
    }
    if (props.autoFillType === 'xml') {
      const res = props.clipboardValue?.likeXML()
      if (res && props.clipboardValue) {
        console.log('xml', res)
        state.inputValue.value = props.clipboardValue.getOriginData()
        handleLeftChange()
        emit('acceptClipboardCb')
      }
    }
    if (props.autoFillType === 'escape-html') {
      const res = props.clipboardValue?.isEscapeHTML()
      if (res && props.clipboardValue) {
        state.inputValue.value = props.clipboardValue.getOriginData()
        handleLeftChange()
        emit('acceptClipboardCb')
      }
    }
  }
})

function handleLeftClick(
  event: MouseEvent,
  clickCallBack?: (
    event: MouseEvent,
    inputValue: Ref<string>,
    outputValue: Ref<string>,
  ) => void,
) {
  clickCallBack && clickCallBack(event, state.inputValue, state.outputValue)
}
function handleRightClick(
  event: MouseEvent,
  clickCallBack?: (
    event: MouseEvent,
    inputValue: Ref<string>,
    outputValue: Ref<string>,
  ) => void,
) {
  clickCallBack && clickCallBack(event, state.inputValue, state.outputValue)
}
async function handleLeftChange() {
  if (props.onChange) {
    try {
      state.outputValue.value = await props.onChange(state.inputValue)
    } catch (e: any) {
      leftState.error.value = true
      leftState.errorMessage.value = e.message as string
      if (e.line) {
        leftState.errLine.value = e.line
      }
      console.error(e)
      return
    }
  } else {
    return
  }
}

/** 右侧结果变化 */
async function handleRightChange() {
  if (props.onResultChange) {
    try {
      state.inputValue.value = await props.onResultChange(state.outputValue)
    } catch (e: any) {
      rightState.error.value = true
      rightState.errorMessage.value = e.message as string
      if (e.line) {
        rightState.errLine.value = e.line
      }
      console.error(e)
      return
    }
  } else {
    return
  }
}
</script>

<style scoped lang="less">
// ::-webkit-scrollbar {
//   width: 4px;
//   height: 4px;
// }
// ::-webkit-scrollbar-thumb {
//   background-color: #ddd;
// }
.TransForm {
  user-select: none;
  &-right-header,
  &-left-header {
    display: flex;
    margin-bottom: 10px;
    &-title {
      flex: 2;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      white-space: nowrap;
    }
    &-button {
      // flex: 8;
      display: flex;
      align-items: center;
      overflow-x: auto;
      button {
        margin-right: 10px;
      }
    }
  }
  &-left-input,
  &-right-input {
    height: calc(100% - 30px);
    width: 100%;
  }
  &-left-content,
  &-right-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .error {
    border-top: var(--error-line-background) 2px solid;
    border-radius: 5px;
    height: 2px;
    width: 100%;
    position: absolute;
    z-index: 1;
  }

  .error-message {
    flex: 8;
    width: 0;
    .ant-alert-error {
      width: 100%;
      height: 24px;

      :deep(.ant-alert-message) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
