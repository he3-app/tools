<template>
  <h-layout-single mode="middle" :width="1280">
    <div class="slug">
      <div class="input">
        <h-multiline-input
          v-model="input"
          autofocus
          class="input"
          :title="t('input')"
          @change="generate"
        />
        <p class="option">
          <span>{{ t("delimiter") }}</span>
          <a-input
            v-model:value="Delimiter"
            class="passphrase opt"
            @change="generate"
          />

          <a-checkbox v-model:checked="checkedNum" @change="generate">{{
            t("removeNumber")
          }}</a-checkbox>

          <a-checkbox
            v-model:checked="checkedWord"
            style="margin: 0 10px"
            @change="generate"
          >
            {{ t("removeWord") }}</a-checkbox
          >
        </p>
      </div>
      <h-multiline :value="output" :title="t('output')" />
    </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import { pinyin } from "pinyin-pro";
import slug from 'slug'
import messages from "./lang.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const input = ref("A Free, Modern Toolbox, Built for Developers.");
const output = ref("");
const Delimiter = ref("-");
const checkedNum = ref<boolean>(false);
const checkedWord = ref<boolean>(false);
const generate = () => {
  if (input.value.length <= 0) {
    window.$he3.message.warning(
      "Please enter your word or phrase (like: Article title or any web page title) "
    );
    return;
  }

  if (Delimiter.value.length <= 0) {
    window.$he3.message.warning("Please enter the delimiter");
    return;
  }
  input.value = pinyin(input.value, { toneType: "none", nonZh: "consecutive" });
  const InputStrs = input.value.split("\n");
  let outputStrs: string[] = [];
  for (let i in InputStrs) {
    outputStrs.push(
      slug(
        checkedWord.value
          ? InputStrs[i].replace(/\bfor\b|\band\b|\bif\b|\bor\b/g, "")
          : InputStrs[i],
        {
          replacement: Delimiter.value,
          remove: checkedNum.value ? /[0-9]/g : null,
        }
      )
    );
  }
  output.value = outputStrs.join("\n");
};

setTimeout(() => {
  generate();
});
</script>
<style scoped lang="less">
.slug {
  .option {
    margin-top: 10px;
  }
  .passphrase {
    width: 150px;
  }
  .opt {
    margin: 0 10px;
  }
  .padding-select {
    width: 100px;
  }
}
</style>
