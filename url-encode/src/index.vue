<template>
  <h-layout-single mode="middle" :width="1280">
      <div class="url-encode">
        <div class="input">
          <p>
            <span>
              {{ $t('input_tip') }}
            </span>
            <span class="option">
              <a-radio-group v-model:value="option" size="small" @change="encode">
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
            @change="encode"
          />
        </div>
        <h-multiline-input
          v-model:modelValue="outputValue"
          :title="$t('result_tip_no_colon')"
          :autofocus="false"
          @change="decode"
        />
      </div>
  </h-layout-single>
</template>

<script setup lang="ts">

import {ref,onMounted} from "vue"
import { isUrl } from "./util";
const inputValue = ref(
  'https://he3.app?name=He3 Application&platform="apple,windows"',
)
const outputValue = ref('')
const option = ref('uri')

const encode = () => {
  try {
    if (option.value === 'uriComponent') {
      outputValue.value = encodeURIComponent(inputValue.value)
    } else {
      outputValue.value = encodeURI(inputValue.value)
    }
  } catch (error) {
    $he3.message.warning((error as any).toString())
  }
}

const decode = () => {
  try {
    if (option.value === 'uriComponent') {
      inputValue.value = decodeURIComponent(outputValue.value)
    } else {
      inputValue.value = decodeURI(outputValue.value)
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
  encode();

})
</script>
<style scoped lang="less">
.url-encode {
  .option {
    float: right;
  }

  .input {
    margin-bottom: 10px;
  }
}
</style>
