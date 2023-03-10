<template>
  <h-layout-split-pane>
    <template #left>
      <div style="height: 100%">
        <div class="operate">
        <a-button size="small" @click="input = sample">{{
          t('sample')

        }}</a-button>
        <a-button size="small" @click="input = ''">{{
          t('clear')
        }}</a-button>
      </div>
      <h-code-editor
        v-model="input"
        :style="{ height: '100%' }"
        :placeholder="t('input.placeholder')"
        />
      </div>
    </template>
    <template #right>
      <div>
        <div class="operate">
          <a-select
            v-model:value="caseTypeSelect"
            class="converter"
            style="width: 120px"
            size="small"
          >
            <a-selectOption v-for="(v, k, i) in CaseType" :key="i" :value="v">{{
              t(`output.${k}`)
            }}</a-selectOption>
          </a-select>
          <h-text-copy-button :copy-content="output" />
        </div>
        <h-code-editor
          v-model="output"
          :style="{ height: '100%' }"
          :placeholder="t('output.placeholder')"
          />
          <a-button>
            {{ $t('copy') }} 
          </a-button>
      </div>
    </template>
  </h-layout-split-pane>
</template>

<script setup lang="ts">
import { sample, CaseType, CaseConverter } from './constants'
import { ref, watch } from "vue"
import { useI18n } from 'vue-i18n'
import messages from './lang'

const { t } = useI18n({
  locale: localStorage.getItem('webviewLang'),
  messages
})

const input = ref(sample)
const caseTypeSelect = ref(CaseType.LOWER_CASE)
const output = ref('')

watch(
  [caseTypeSelect, input],
  ([newSelect, newInput]) => {
    output.value = ''
    if (!newInput) return

    // Handle multiple line.
    const lines = newInput.split('\n')
    lines.map((line, index) => {
      if (index === lines.length - 1) {
        output.value += CaseConverter[newSelect](line.trim())
      } else {
        output.value += CaseConverter[newSelect](line.trim()) + '\n'
      }
    })
  },
  {
    immediate: true,
  },
)

defineExpose({
  meta: messages
})

</script>

<style scoped lang="less">
.input,
.output {
  margin-right: 10px;
}

.input,
.output {
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > .operate {
    padding-top: 1vh;
    padding-bottom: 1vh;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }

  & > textarea {
    width: 100%;
    flex-grow: 1;
    resize: none;
  }
}

.output {
  & > .operate {
    & > .converter {
      display: flex;
      gap: 5px;
      overflow-x: scroll;
    }
  }
}
</style>
