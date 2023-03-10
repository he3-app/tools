<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="url-decode">
        <div class="input">
          <p>
            <span>
              {{ $t('input_tip') }}
            </span>
            <span class="option">
              <a-radio-group v-model:value="option" size="small" @change="decode">
                <a-radio-button value="uri">URI</a-radio-button>
                <a-radio-button value="uriComponent">URI Component</a-radio-button>
              </a-radio-group>
            </span>
          </p>
          <h-input
            select-all-on-mount
            v-model:value="inputValue"
            autofocus
            class="input"
            @change="decode"
          />
        </div>

        <h-multiline-input
          v-model:modelValue="outputValue"
          :title="$t('result_tip')"
          :autofocus="false"
          @change="encode"
        />
      </div>
  </h-layout-single>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue"
import { isUrl } from "./util";

const inputValue = ref(
  'https://he3.app?name=He3%20Application&platform=%22apple,windows%22',
)
const outputValue = ref('')
const option = ref('uri')

const decode = () => {
  try {
    if (option.value === 'uriComponent') {
      outputValue.value = decodeURIComponent(inputValue.value)
    } else {
      outputValue.value = decodeURI(inputValue.value)
    }
  } catch (error) {
    $he3.message.warning((error as any).toString())
  }
}
const encode = () => {
  try {
    if (option.value === 'uriComponent') {
      inputValue.value = encodeURIComponent(outputValue.value)
    } else {
      inputValue.value = encodeURI(outputValue.value)
    }
  } catch (error) {
    $he3.message.warning((error as any).toString())
  }
}
onMounted(() => {
  $he3.getLastClipboard().then((res) => {
    if (isUrl(res)) {
      inputValue.value = res;
      encode();
      $he3.onUseClipboardValue();
    }
  });
  decode()
})
</script>
<style scoped lang="less">
.url-decode {
  .option {
    float: right;
  }

  .input {
    margin-bottom: 10px;
  }
}
</style>
