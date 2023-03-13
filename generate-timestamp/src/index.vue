<template>
  <h-layout-single mode="middle" :width="800">
    <a-form
      v-show="!he3.renderOnSearch"
      class="timestamp-generate-form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item :label="t('rangeStart')">
        <a-date-picker v-model:value="start" :allow-clear="false" show-time />
      </a-form-item>
      <a-from-item :label="t('rangeEnd')">
        <a-date-picker v-model:value="end" :allow-clear="false" show-time />
      </a-from-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="generateTimestamp">
          {{ t("generateButton.name") }}
        </a-button>
      </a-form-item>
    </a-form>

    <h-kv  :value="result" />
  </h-layout-single>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs";
import { DateFormatEnum } from "./util";
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const he3 = window.$he3
const start = ref<Dayjs>(dayjs().add(-42, "year"));
const end = ref<Dayjs>(dayjs().add(58, "year"));
const timestamp = ref(0);
const output = ref("");
const result = ref({});
const format = ref(DateFormatEnum.RFC2822);

const formatOptions: { label: string; value: string }[] = [];
if (window.$he3.renderOnSearch) {
  formatOptions.push(
    {
      label: "RFC2822",
      value: DateFormatEnum.RFC2822,
    },
    {
      label: "UnixTimestamp",
      value: DateFormatEnum.UnixTimestamp,
    },
    {
      label: "UnixTimestampMs",
      value: DateFormatEnum.UnixTimestampMs,
    }
  );
} else {
  const keys = Object.keys(DateFormatEnum);
  keys.forEach((key) => {
    formatOptions.push({
      label: key,
      value: DateFormatEnum[key as keyof typeof DateFormatEnum],
    });
  });
}

function generateTimestamp() {
  const startTimestamp = start.value.valueOf();
  const endTimestamp = end.value.valueOf();
  timestamp.value =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
    startTimestamp;
}

function formatTimestamp() {
  if (!timestamp.value) {
    return;
  }
  output.value = dayjs(timestamp.value).format(format.value);
  formatOptions.forEach((item) => {
    result.value = {
      ...result.value,
      [item.label]: dayjs(timestamp.value).format(item.value),
    };
  });
}

onMounted(() => {
  generateTimestamp();
});

watch(timestamp, (newTimestamp, oldTimestamp) => {
  if (newTimestamp === oldTimestamp) {
    return;
  }
  formatTimestamp();
});
</script>

<style scoped lang="less"></style>
