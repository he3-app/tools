<template>
  <h-layout-single mode="middle" :width="1280">
    <a-upload :before-upload="beforeUpload" :max-count="1">
      <a-button>{{ t("select") }}</a-button>
    </a-upload>

    <div v-show="false" id="bar-code-renderer"></div>

    <h-multiline :title="t('content')" :value="result" />
  </h-layout-single>
</template>

<script setup lang="ts">
import messages from "./lang.json";
import { useI18n } from "vue-i18n";
import { UploadProps } from "ant-design-vue";
import { Html5Qrcode } from "html5-qrcode";
import { ref } from "vue";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});

const result = ref("");

const beforeUpload: UploadProps["beforeUpload"] = async (file: File) => {
  let scanner = new Html5Qrcode("bar-code-renderer");
  result.value = await scanner.scanFile(file, false);
  return false;
};
</script>

<style scoped lang="less"></style>
