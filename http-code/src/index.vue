<template>
  <h-layout-single mode="middle" :width="1280">
    <div id="top"></div>
    <div v-show="!$he3.renderOnSearch" class="outer">
      <a-select
          v-model:value="inputValue"
          show-search
          placeholder="100"
          style="width: 100%"
          :options="options"
          :filter-option="filterOption"
          @change="onSearch"
      />
      <div class="introBox">
        <a-card class="statusCard" @click="onSearch('Information')">
          <p>Information</p>
          <p>1.x.x</p>
        </a-card>
        <a-card class="statusCard" @click="onSearch('Successful')">
          <p>Successful</p>
          <p>2.x.x</p>
        </a-card>
        <a-card class="statusCard" @click="onSearch('Redirection')">
          <p>Redirection</p>
          <p>3.x.x</p>
        </a-card>
        <a-card class="statusCard" @click="onSearch('Client error')">
          <p>Client error</p>
          <p>4.x.x</p>
        </a-card>
        <a-card class="statusCard" @click="onSearch('Server error')">
          <p>Server error</p>
          <p>5.x.x</p>
        </a-card>
      </div>
      <div
          v-for="(statusSigle, idx) in statusCodes"
          :key="idx"
          class="statusSigle"
      >
        <p :id="statusSigle.name" class="codesName">{{ statusSigle.name }}</p>
        <p>{{ statusSigle.intro }}</p>
        <div
            v-for="(code, index) in statusSigle.codes"
            :key="index"
            class="codeBox"
        >
          <div>
            <p :id="code.status">
              <a-statistic title="Http Status Code" :value="code.status"/>
              <span>{{ code.explain }}</span>
            </p>
            <p>{{ code.meaning }}</p>
          </div>
        </div>
      </div>
    </div>
    <a-button
        v-show="!$he3.renderOnSearch"
        shape="circle"
        class="goTop"
        @click="onSearch('top')"
    >
      <template #icon>
        <arrow-up-outlined/>
      </template>
    </a-button>
    <div v-show="$he3.renderOnSearch">
      <div style="margin-top: 10px; padding: 20px">
        <p>
          <a-statistic
              title="Http Status Code Explain:"
              :value="res.status + ' ' + res.explain"
          />
        </p>
        <p>{{ res.meaning }}</p>
      </div>
    </div>
  </h-layout-single>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive} from 'vue'
import {statusCodes, selectOpt, isHttpCode} from './utils'

const $he3 = window.$he3

const inputValue = ref<string>('')
const res = reactive<any>({
  status: '',
  explain: '',
  meaning: '',
})

const onSearch = (searchValue: string) => {
  const element = document.getElementById(searchValue)
  if (element) {
    element.scrollIntoView()
  }
}
const options = ref(selectOpt)
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
onMounted(() => {
  $he3.getLastClipboard().then(res => {
    console.log(res)
    if (isHttpCode(res)) {
      onSearch(res)
      $he3.onUseClipboardValue()
    }
  })
})
</script>
<style lang="less" scoped>
.outer {
  padding: var(--extension-padding);
}

.fixedIpt {
  position: fixed;
}

.statusCard {
  margin-top: 30px;
  width: 200px;
  height: 120px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
}

.statusCard:hover {
  border: 1px solid var(--primary-color);
}

.statusCard p:nth-child(1) {
  font-size: 20px;
  margin-bottom: 0px;
}

.statusSigle {
  margin-top: 50px;
}

.introBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.codeBox {
  margin: 40px 0px;
  padding: 0px 5px;
  font-size: 16px;
}

.codeBox:hover {
  border-left: var(--primary-border-color) solid 5px;
}

.codesName {
  font-weight: 600;
  font-size: 25px;
}

.goTop {
  position: fixed;
  bottom: 50px;
  right: 50px;
  opacity: 0.2;
  cursor: pointer;
}

.goTop:hover {
  opacity: 1;
}
</style>
