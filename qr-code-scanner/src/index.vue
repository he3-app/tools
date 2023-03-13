<template>
  <div class="scanner">
    <h-layout-single mode="middle" :max-width="1280">
        <a-upload :before-upload="fileSelected" :max-count="1">
          <a-button>
            <upload-outlined />
            {{ t("uploadQRCode") }}
          </a-button>
        </a-upload>
        <h-multiline-result
          :result="scanResult"
          :result-desc="t('result')"
        />
    </h-layout-single>
  </div>
</template>

<script setup lang="ts">
import messages from "./lang.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { BrowserQRCodeReader } from "@zxing/browser";
import { UploadProps } from "ant-design-vue";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});

const scanResult = ref("");

const fileSelected: UploadProps["beforeUpload"] = async (file: File) => {
  const codeReader = new BrowserQRCodeReader();
  let source = URL.createObjectURL(file);
  const resultImage = await codeReader.decodeFromImageUrl(source);
  scanResult.value = resultImage as unknown as string;
  return false;
};
</script>

<style scoped lang="less"></style>
