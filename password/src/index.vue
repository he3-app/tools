<template>
  <h-horizontal-layout mode="middle">
    <template #left>
      <div class="wrapper">
        <a-form :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-form-item :label="t('length.label')">
            <a-input-number
              v-model:value="randomPassword.length"
              type="number"
              min="1"
              max="100"
              @change="generate"
            />
            <a-slider
              v-model:value="randomPassword.length"
              :min="1"
              :max="100"
              @change="generate"
            />
          </a-form-item>
          <a-form-item :label="t('character-set.label')">
            <a-select
              v-model:value="randomPassword.charSet"
              :placeholder="t('character-set.label')"
              mode="multiple"
              style="width: 100%"
              allow-clear
              @change="generate"
            >
              <a-select-option
                v-for="(v, k, i) in RawCharSet"
                :key="i"
                :value="v"
                >{{ t(`character-set.${k}`) }}:
                {{ v }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item :label="t('amount.label')">
            <a-input-number
              v-model:value="randomPassword.amount"
              type="number"
              min="1"
              max="1000"
              @change="generate"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <Button type="primary" @click="generate">{{
              t("generateBtn")
            }}</Button>
          </a-form-item>
        </a-form>
      </div>
    </template>
    <template #right>
      <h-multiline
        :value="randomPasswordResult"
        :title="t('result')"
      />
    </template>
  </h-horizontal-layout>
</template>

<script setup lang="ts">
import {
  consonants,
  copyableSymbols,
  digits,
  fullSymbols,
  lower,
  randomPassword as randomPasswordGen,
  symbols,
  upper,
  vowels,
} from "secure-random-password";
import messages from "./lang.json";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});


const RawCharSet = {
  lower,
  upper,
  digits,
  consonants,
  vowels,
  symbols,
  copyableSymbols,
  fullSymbols,
};

const randomPassword = ref<{
  length: number;
  charSet?: Array<keyof typeof RawCharSet>;
  amount: number;
}>({
  length: 12,
  amount: 1,
});

const randomPasswordResult = ref("");

const generate = () => {
  let passwords = [];

  for (let i = 0; i < randomPassword.value.amount; i++) {
    passwords.push(generateOnePassword());
  }
  randomPasswordResult.value = passwords.join("\n");
};

const generateOnePassword = () => {
  let length = 0 + randomPassword.value.length;

  const charSet = randomPassword.value.charSet;

  if (charSet && charSet.length > 0) {
    if (length < charSet.length) {
      length = charSet.length;
    }
    return randomPasswordGen({
      length,
      characters: charSet,
    });
  } else {
    if (length < 3) {
      length = 3;
    }
    return randomPasswordGen({
      length,
    });
  }
};

setTimeout(() => {
  generate();
});
</script>

<style scoped lang="less">
.wrapper {
  padding: 20px;

  .number-limit {
    width: 150px;
  }
}
</style>
