<template>
  <Splitpanes class="he3-theme">
    <Pane min-size="20" class="input">
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
    </Pane>
    <Pane min-size="20" class="output">
      <div class="operate">
        <a-select
          v-model:value="caseTypeSelect"
          class="converter"
          style="width: 120px"
          size="small"
        >
          <a-select-option v-for="(v, k, i) in CaseType" :key="i" :value="v">{{
            t(`output.${k}`)
          }}</a-select-option>
        </a-select>
        <h-text-copy-button :content="output" />
      </div>
      <h-code-editor
        v-model="output"
        :style="{ height: '100%' }"
        :placeholder="t('output.placeholder')"
      />
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes' // https://antoniandre.github.io/splitpanes/
import { sample, CaseType, CaseConverter } from './util'
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const $he3 = window.$he3;


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
