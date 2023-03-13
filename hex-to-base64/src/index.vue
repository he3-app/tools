<template>
  <h-layout-single mode="middle">
    <h-multiline-input
      v-model="base64String"
      :title="t('input')"
      @change="handleChange"
    />
    <div class="option">
      <span class="result-opt">
        <span class="opt">{{ t("delimiter_tip") }}</span>
        <span class="opt">
          <a-select
            v-model:value="delimiter"
            size="small"
            @change="handleChange"
          >
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
          </a-select>
        </span>
        <span class="opt">
          <a-radio-group
            v-model:value="resultCase"
            size="small"
            @change="handleChange"
          >
            <a-radio-button value="lower">
              {{ t("lower_case") }}
            </a-radio-button>
            <a-radio-button value="upper">
              {{ t("upper_case") }}
            </a-radio-button>
          </a-radio-group>
        </span>
      </span>
    </div>
    <h-multiline :title="t('result')" :value="hexString" />
  </h-layout-single>
</template>

<script setup lang="ts">
import { Buffer } from "buffer";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const he3 = window.$he3;

const EXAMPLE_BASE64_STRING =
  "H8BRh8j48O9oYatfu5AZzq6A9RINhZO5H16dQZngK7T62em8MUt1FLm52t+eX6xO";
const base64String = ref(EXAMPLE_BASE64_STRING);
const hexString = ref("");
const delimiter = ref("");
const resultCase = ref("lower");

onMounted(() => {
  handleChange();
});

function handleChange() {
  let res = convert(base64String.value);

  if (delimiter.value != "" && res.length > 2) {
    const arr = [];
    for (let index = 0; index < res.length; index += 2) {
      arr.push(res.slice(index, index + 2));
    }
    res = arr.join(delimiter.value);
  }

  if (resultCase.value === "upper") {
    res = res.toUpperCase();
  }

  hexString.value = res;
}

function convert(str: string): string {
  let buf = Buffer.from(str, "base64");
  return buf.toString("hex");
}
</script>

<style scoped lang="less">
.option {
  margin: 20px 0px;
  height: 30px;
  .result-opt {
    float: right;
    .opt {
      margin-left: 10px;
    }
  }
}
</style>
