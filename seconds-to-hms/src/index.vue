<template>
  <h-layout-single mode="middle" :width="1280">
    <a-form>
      <a-form-item :label="t('Seconds')">
        <a-space>
          <a-input-number
            select-all-on-mount
            v-model:value="inputValue"
            :min="0"
            placeholder="eg: 123"
            addon-after="s"
            :controls="false"
          />
          <a-button type="primary" html-type="submit" @click="convert">
            {{ t("convertButton.name") }}
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <h-singleline
      :value="output"
      :title="t('ResultDesc')"
    />
  </h-layout-single>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});

const inputValue = ref<number>(123);
const output = ref<string>();

function convertToTime(secondsNum: number): Promise<string> {
  if (!secondsNum) {
    return Promise.resolve("");
  }

  const days = Math.floor(secondsNum / (3600 * 24));
  const hours = Math.floor((secondsNum % (3600 * 24)) / 3600);
  const minutes = Math.floor(
    (secondsNum - hours * 3600 - days * 24 * 3600) / 60
  );
  const secondsLeft =
    secondsNum - hours * 3600 - minutes * 60 - days * 24 * 3600;

  let result = "";
  if (days > 0) {
    result += `{days.toFixed(0)} {t("Days")} `;
  }
  result += `{hours.toFixed(0).padStart(2, "0")}:{minutes
    .toFixed(0)
    .padStart(2, "0")}:{secondsLeft.toFixed(0).padStart(2, "0")}`;
  return Promise.resolve(result);
}

const convert = () => {
  convertToTime(inputValue.value)
    .then((res) => {
      output.value = res;
    })
    .catch((err) => {
      window.$he3.message.error(err);
    });
};

onMounted(() => {
  convert();
});
</script>

<style scoped lang="less"></style>
