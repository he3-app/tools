<template>
  <h-layout-single mode="middle" :width="1280">
    <div>
      <h-multiline-input 
        select-all-on-mount
        v-model="inputValue"
        :title="t('input_tip')"
        @change="encode"
      />
    </div>
    <div class="option">
      <a-space>
        <span>
          {{ t("delimiter_tip") }}
        </span>
        <span>
          <a-select v-model:value="delimiter" class="opt" @change="encode">
            <a-select-option :value="''">
              ({{ t("delimiter_empty") }})
            </a-select-option>
            <a-select-option :value="':'">
              {{ t("delimiter_colon") }}(:)
            </a-select-option>
            <a-select-option :value="' '">
              {{ t("delimiter_space") }}({{ " " }})
            </a-select-option>
            <a-select-option :value="'-'">
              {{ t("delimiter_hyphen") }}(-)
            </a-select-option>
            <a-select-option :value="','">
              {{ t("delimiter_comma") }}(,)
            </a-select-option>
          </a-select>
        </span>
      </a-space>
    </div>
    <h-multiline
      :value="outputValue"
      :title="t('result_tip')"
    />
  </h-layout-single>
</template>

<script setup lang="ts">
import messages from "./lang.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const he3 = window.$he3;
const inputValue = ref(`A Free, Modern Toolbox
Built for Developers.`);
const outputValue = ref("");
const delimiter = ref("");

const encode = () => {
  let ret = [];
  for (let n = 0; n < inputValue.value.length; n++) {
    let h = inputValue.value[n].charCodeAt(0).toString(16);
    if (h.length <= 1) {
      h = "0" + h;
    }
    ret.push(h);
  }
  outputValue.value = ret.join(delimiter.value).toUpperCase();
};

setTimeout(() => {
  encode();
});
</script>

<style scoped lang="less">
.option {
  margin-top: 20px;
}
</style>
