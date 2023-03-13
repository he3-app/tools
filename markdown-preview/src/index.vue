<template>
  <div class="markdownPreview">
    <div class="header">
      <a-select
        v-model:value="chosenPicType"
        size="small"
        class="button"
        style="width: 90px"
      >
        <a-select-option v-for="(v, k, i) in PicType" :key="i" :value="v">{{
          k
        }}</a-select-option>
      </a-select>
      <a-button type="primary" size="small" class="button" @click="exportImg">{{
        t("imageExport")
      }}</a-button>
      <a-button type="primary" size="small" class="button" @click="exportPdf">{{
        t("pdfExport")
      }}</a-button>
      <h-text-copy-button
        :content="He3"
        type="primary"
        :title="t('copy')"
        class="button"
        icon
      />
    </div>
    <div class="content">
      <h-code-editor v-model="textInput" class="input" lang="TYPESCRIPT" />
      <div ref="outputRef" class="output"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import messages from "./lang.json";
import { marked } from "marked";
import { toPng, toJpeg, toSvg } from "html-to-image";
import domToPdf from "export-dom2pdf";
import { useI18n } from "vue-i18n";
const $he3 = window.$he3;

const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});

const emit = defineEmits(["acceptClipboardCb"]);

const inputValue = ref(`## hello He3`);
const outputRef = ref<HTMLElement | null>(null);
const outputValue = ref("");
watch(inputValue, () => {
  if (outputRef.value) {
    const markdown = marked.parse(inputValue.value);
    outputValue.value = markdown;
    outputRef.value.innerHTML = markdown;
  }
});
onMounted(() => {
  let isMarkdown = window.$he3.clipboardValue?.isMarkdown()
  if (isMarkdown) {
    inputValue.value = window.$he3.clipboardValue?.getOriginData()
    emit('acceptClipboardCb')
  }
  if (outputRef.value) {
    const markdown = marked.parse(inputValue.value)
    outputValue.value = markdown
    outputRef.value.innerHTML = markdown
  }
})
// 导出
const PicType = {
  PNG: "png",
  WEBP: "webp",
  SVG: "svg",
};
const chosenPicType = ref(PicType.PNG);
const exportImg = () => {
  if (inputValue.value.length <= 0) {
    window.$he3.message.warning(t("nothing"));
    return;
  }

  const htmlToImage = {
    [PicType.PNG]: toPng,
    [PicType.WEBP]: toJpeg,
    [PicType.SVG]: toSvg,
  };

  htmlToImage[chosenPicType.value](outputRef.value as HTMLElement, {
    style: {
      transform: "scale(1)",
    },
  })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `markdown-image.${chosenPicType.value}`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      window.$he3.message.error("oops, something went wrong!");
    });
};
const exportPdf = () => {
  if (inputValue.value.length <= 0) {
    window.$he3.message.warning(t("nothing"));
    return;
  }
  domToPdf(outputRef.value as HTMLElement);
};
</script>

<style lang="less" scoped>
@header: 40px;
.markdownPreview {
  height: calc(100% - @header);
  padding: 10px 0px;
  .header {
    height: @header;
    .button {
      float: right;
      margin-right: 10px;
    }
  }
  .content {
    min-height: calc(100% - @header);
    display: flex;
    border-radius: 4px;
    justify-content: space-around;
    .input {
      width: 48%;
      // min-height: 100%;
    }
    .output {
      width: 48%;
      // min-height: 100%;
      padding: 4px 20px;
      background-color: var(--output-bg-color);
      border-radius: var(--border-radius-base);
      :deep(img) {
        max-width: 100%;
      }
    }
  }
}
</style>
