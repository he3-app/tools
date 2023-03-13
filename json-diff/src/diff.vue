<template>

  <div class="diff">
    <div class="header">
      <a-button
          v-if="props.type !== `text`"
          type="primary"
          @click="formatAndDiff"
      >{{ t('formatAndDiff') }}
      </a-button>
    </div>
    <div id="codeMirror" class="code-contrast"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from './lang.json'
const $he3 = window.$he3
const { t } = useI18n({
  locale: window.$he3.lang,
  messages
})
import { objToYaml } from 'he3-common'
import CodeMirror from 'codemirror'
import 'codemirror/addon/merge/merge.css'
import 'codemirror/addon/merge/merge.js'
import 'codemirror/lib/codemirror.css'
import DiffMatchPatch from 'diff-match-patch'
import {isJson, isYaml} from 'he3-common'
import yaml from 'js-yaml'
import { isNull } from 'lodash'
import sortJson from 'sort-json'
import {
  textDiffInitData,
  textDiffInitData2,
  yamlDiffExample,
  yamlDiffExample2,
  jsonMergeExample, jsonMergeExample2
} from './example'

if (!window.diff_match_patch) {
  window.diff_match_patch = DiffMatchPatch
  window.DIFF_DELETE = -1
  window.DIFF_INSERT = 1
  window.DIFF_EQUAL = 0
}

const props = defineProps<{
  type?: string
}>()

const editor = ref(null)


let currentTheme = $he3.theme
function render(left, right, theme) {
  currentTheme = theme || currentTheme;
  try {
    editor.value.wrap.parentNode.removeChild(editor.value.wrap)
  } catch (e) {
    console.log(e)
  }
  const e = CodeMirror.MergeView(document.getElementById('codeMirror'), {
    value: isNull(left) ? '' : left,
    origRight: isNull(right) ? '' : right,
    orig: '',
    lineNumbers: true,
    mode: 'text/html',
    highlightDifferences: true,
    connect: 'align',
    readOnly: false,
    allowEditingOriginals: true,
    theme: (currentTheme === 'dark') ? '3024-night' : '', // 定义了 class 的后缀，当前主题来自 'codemirror-v5/theme/3024-night.css'
  })
  editor.value = e
}
onMounted(() => {
  $he3.subscribeThemeChange(() => {
    console.log('123132')
    render(editor.value.edit.getValue(), editor.value.right.orig.getValue())
  })

  // 不同 diff 工具切换有渲染不出来问题，此处用延迟来保证上一次的 dom 被卸载掉
  setTimeout(() => {


    $he3.getLastClipboard().then(res => {
      if (props.type === 'json') {
        if (isJson(res)) {
          render(res, '')
          $he3.onUseClipboardValue()
        } else {
          render(jsonMergeExample, jsonMergeExample2)
        }
      } else if (props.type === 'yaml') {
        if (isYaml(res)) {
          render(res, '')
          $he3.onUseClipboardValue()
        } else {
          render(yamlDiffExample, yamlDiffExample2)
        }
      } else {
        render(textDiffInitData, textDiffInitData2)
      }
    })
  })
})

function formatAndDiff() {
  if (props.type === 'yaml') {
    let leftValue = editor.value.edit.getValue()
    leftValue = yaml.load(leftValue)
    leftValue = sortJson(leftValue)
    let rightValue = editor.value.right.orig.getValue()
    rightValue = yaml.load(rightValue)
    rightValue = sortJson(rightValue)
    render(objToYaml(leftValue), objToYaml(rightValue))
  }

  if (props.type === 'json') {
    let left
    let right
    try {
      left = JSON.parse(editor.value.edit.getValue())
    } catch (e) {
      console.warn(e)
      $he3.message.error(t('jsonParseError'))
      return
    }
    try {
      left = sortJson(left)
    } catch (e) {
      console.warn(e)
      return
    }
    try {
      right = JSON.parse(editor.value.right.orig.getValue())
    } catch (e) {
      console.warn(e)
      $he3.message.error(t('jsonParseError'))
      return
    }
    try {
      right = sortJson(right)
    } catch (e) {
      console.warn(e)
      return
    }
    render(JSON.stringify(left, null, 2), JSON.stringify(right, null, 2))
  }
}
</script>
<style scoped lang="less">
.diff {
  height: 100%;

  .header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }

  #codeMirror {
    height: calc(100% - 40px);
  }

  :deep(.CodeMirror-merge) {
    border: 1px solid var(--primary-border-color);
    height: 100%;
  }

  :deep(.CodeMirror-merge-gap) {
    border-color: var(--primary-border-color);
  }

  :deep(.CodeMirror-merge-pane) {
    height: 100%;
  }

  :deep(.CodeMirror) {
    height: 100%;
    font-family: var(--code-font-family);
  }
  // diff配色
  :deep(.CodeMirror-merge-r-inserted) {
    background-color: var(--text-diff-green);
    background-image: none;
  }
  :deep(.CodeMirror-merge-r-deleted) {
    background-color: var(--text-diff-red);
    background-image: none;
  }
  :deep(.CodeMirror-merge-editor .CodeMirror-linebackground) {
    background: var(--text-diff-background-green);
  }
  :deep(.CodeMirror-merge-right .CodeMirror-linebackground) {
    background: var(--text-diff-background-red);
  }
  :deep(.CodeMirror-merge-r-chunk-end) {
    border: none;
  }
  :deep(.CodeMirror-merge-r-chunk-start) {
    border: none;
  }
}
</style>

<!-- CodeMirror dark 模式 -->
<style>
.cm-s-3024-night.CodeMirror {
  background: #090300;
  color: #d6d5d4;
}

.cm-s-3024-night div.CodeMirror-selected {
  background: #3a3432;
}

.cm-s-3024-night .CodeMirror-line::selection,
.cm-s-3024-night .CodeMirror-line > span::selection,
.cm-s-3024-night .CodeMirror-line > span > span::selection {
  background: rgba(58, 52, 50, 0.99);
}

.cm-s-3024-night .CodeMirror-line::-moz-selection,
.cm-s-3024-night .CodeMirror-line > span::-moz-selection,
.cm-s-3024-night .CodeMirror-line > span > span::-moz-selection {
  background: rgba(58, 52, 50, 0.99);
}

.cm-s-3024-night .CodeMirror-gutters {
  background: #090300;
  border-right: 0px;
}

.cm-s-3024-night .CodeMirror-guttermarker {
  color: #db2d20;
}

.cm-s-3024-night .CodeMirror-guttermarker-subtle {
  color: #5c5855;
}

.cm-s-3024-night .CodeMirror-linenumber {
  color: #5c5855;
}

.cm-s-3024-night .CodeMirror-cursor {
  border-left: 1px solid #807d7c;
}

.cm-s-3024-night span.cm-comment {
  color: #cdab53;
}

.cm-s-3024-night span.cm-atom {
  color: #a16a94;
}

.cm-s-3024-night span.cm-number {
  color: #a16a94;
}

.cm-s-3024-night span.cm-property,
.cm-s-3024-night span.cm-attribute {
  color: #01a252;
}

.cm-s-3024-night span.cm-keyword {
  color: #db2d20;
}

.cm-s-3024-night span.cm-string {
  color: #fded02;
}

.cm-s-3024-night span.cm-variable {
  color: #01a252;
}

.cm-s-3024-night span.cm-variable-2 {
  color: #01a0e4;
}

.cm-s-3024-night span.cm-def {
  color: #e8bbd0;
}

.cm-s-3024-night span.cm-bracket {
  color: #d6d5d4;
}

.cm-s-3024-night span.cm-tag {
  color: #db2d20;
}

.cm-s-3024-night span.cm-link {
  color: #a16a94;
}

.cm-s-3024-night span.cm-error {
  background: #db2d20;
  color: #807d7c;
}

[mode='dark'] #codeMirror .CodeMirror-merge-gap {
  background: #090300;
}

[mode='dark'] .CodeMirror-merge-r-chunk {
  background-color: #135c7a;
}

.cm-s-3024-night .CodeMirror-activeline-background {
  background: #2f2f2f;
}

.cm-s-3024-night .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}
</style>
