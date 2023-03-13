<template>
  <h-horizontal-layout :left-width="400">
    <template #left>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="Offset x">
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="x" :min="-100" :max="100" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="x" :min="-100" :max="100" style="margin-left: 16px" />
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="Offset y">
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="y" :min="-100" :max="100" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="y" :min="-100" :max="100" style="margin-left: 16px" />
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item label="Blur Radius">
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="blurRadius" :min="0" :max="100" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="blurRadius" :min="0" :max="100" style="margin-left: 16px" />
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item label="Spread Radius">
          <a-row>
            <a-col :span="18">
              <a-slider v-model:value="spreadRadius" :min="0" :max="100" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="spreadRadius" :min="0" :max="100" style="margin-left: 16px" />
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item label="Shadow Color">
          <div>
            <h-color-input v-model:pure-color="shadowColor" style="width: 305px" />
          </div>
        </a-form-item>

        <a-form-item label="Inset">
          <a-switch v-model:checked="isInset" />
        </a-form-item>
      </a-form>
      <a-divider />
      <h-code :code="code" lang="CSS" />
    </template>
    <template #right>
      <div class="preview">
        <div class="content" :style="result.join('')"></div>
      </div>
    </template>
  </h-horizontal-layout>
</template>

<script lang="ts" setup>
import { isDark } from './theme'
import { ref, computed } from 'vue'

const x = ref(0)
const y = ref(0)
const blurRadius = ref(10)
const spreadRadius = ref(4)

const shadowColor = ref(isDark() ? '#cccccc' : '#6D2ACA')
const isInset = ref(false)

const result = computed(() => [
  `box-shadow:${x.value}px ${y.value}px ${blurRadius.value}px ${spreadRadius.value
  }px ${shadowColor.value}${isInset.value ? ' inset' : ''};`,
  `
-webkit-box-shadow:${x.value}px ${y.value}px ${blurRadius.value}px ${spreadRadius.value
  }px ${shadowColor.value}${isInset.value ? ' inset' : ''};`,
  `
-moz-box-shadow:${x.value}px ${y.value}px ${blurRadius.value}px ${spreadRadius.value
  }px ${shadowColor.value}${isInset.value ? ' inset' : ''};`,
])

const code = computed(() => result.value.join(''))
</script>

<style lang="less" scoped>
.code-editor {
  border: 1px dashed var(--gray-8);
}

.preview {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  border: 1px solid var(--primary-border-color);
  border-radius: var(--border-radius-base);

  .content {
    width: 100px;
    height: 100px;
    background-color: var(--primary-color);
    border-radius: 4px;
  }
}
</style>
