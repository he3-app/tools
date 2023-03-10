<template>
  <h-layout-single mode="middle" :width="1280">
      {{t("test")}}
  </h-layout-single>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from './lang.json'
const $he3 = window.$he3
const { t } = useI18n({
  locale: window.$he3.lang,
  messages
})

onMounted(() => {
  console.log(t('test'))
})

</script>
<style scoped lang="less">

</style>
