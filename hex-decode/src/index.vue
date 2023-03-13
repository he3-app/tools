<template>
  <h-layout-single mode="middle" :width="1280">
    <div class="input">
      <h-multiline-input 
        select-all-on-mount
        v-model="inputValue"
        :title="t('input_tip')"
        @change="decode"
      />
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

const inputValue = ref(
  "4120467265652C204D6F6465726E20546F6F6C626F780A4275696C7420666F7220446576656C6F706572732E"
);
const outputValue = ref("");

function hex2str(hex: string) {
  let pureHex = hex
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replaceAll(",", "");
  let str = "";
  for (let i = 0; i < pureHex.length; i += 2)
    str += String.fromCharCode(parseInt(pureHex.substr(i, 2), 16));
  return str;
}

const decode = () => {
  outputValue.value = hex2str(inputValue.value);
};

setTimeout(() => {
  decode();
});
</script>

<style scoped lang="less"></style>
