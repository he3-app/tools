<template>
  <h-layout-single mode="middle" :width="1280">
    <a-form>
      <a-form-item :label="t('Duration')">
        <a-space>
          <h-input
            select-all-on-mount
            v-model:value="inputValue"
            placeholder="HH:MM:SS eg: 12:01:02"
            addon-after="HH:MM:SS"
          />
          <a-button type="primary" html-type="submit" @click="convert">
            {{ t("convertButton.name") }}
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <h-singleline :value="output" :title="t('ResultDesc')" />
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

const inputValue = ref<string>("12:21:01");
const output = ref<string>();

function convertToSeconds(time: string | undefined): Promise<string> {
  if (!time) {
    return Promise.resolve("");
  }
  const regex = /^(\d+):(\d+):(\d+)/;
  if (!regex.test(time)) {
    return Promise.reject(t("FormatError"));
  }
  const timeArr = time.split(":");
  if (timeArr.length !== 3) {
    return Promise.reject(t("FormatError"));
  }
  const hours = Number(timeArr[0]);
  const minutes = Number(timeArr[1]);
  const seconds = Number(timeArr[2]);

  const sum = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  return Promise.resolve(sum.toFixed(0).toString());
}

const convert = () => {
  convertToSeconds(inputValue.value)
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
