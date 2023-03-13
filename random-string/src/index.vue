<template>
  
  <h-horizontal-layout mode="middle" :width="350">
    <template #left>
      <div class="wrapper random-string">
        <a-form style="max-width: 400px">
          <!-- seed 种子 -->
          <a-form-item :label="t('seed.label')">
            <a-input
              v-model:value="randomString.seed"
              type="string"
              @change="handleGenerate"
            >
              <template #suffix>
                <a-tooltip
                  placement="top"
                  :title="t('seed.buttonTips')"
                >
                  <a-button
                    type="text"
                    class="refresh-button"
                    @click="refreshSeed"
                  >
                    <redo-outlined />
                  </a-button>
                </a-tooltip>
              </template>
            </a-input>
          </a-form-item>
          <!-- amount 数量 -->
          <a-form-item :label="t('amount.label')">
            <a-input-number
              v-model:value="randomString.amount"
              type="number"
              min="0"
              max="1000"
              @change="handleGenerate"
            />
          </a-form-item>
          <!-- 循环生成列表 uppercased|lowercased|symbols|digits|words|separating|custom-->
          <div v-for="(value, key, index) in randomString.number" :key="index">
            <!-- 分隔符需要添加分隔符选项 -->
            <template v-if="key === 'separating'">
              <a-form-item
                class="random-string-control"
                :label-col="{ span: 17 }"
                :wrapper-col="{ span: 7 }"
                label-align="left"
                :label="t('separating.symbol')"
              >
                <a-select
                  v-model:value="randomString.separatingSymbol"
                  class="random-string-input symbol-control"
                  placeholder=""
                  size="small"
                  allow-clear
                  @change="handleGenerate"
                >
                  <a-select-option
                    v-for="(v, k, i) in (RawCharSet.separating as object)"
                    :key="i"
                    :value="v"
                  >
                    {{ v }}
                    ({{t(`separating.character-set.${k}`) }})
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>

            <!-- 常规input与slider -->
            <a-form-item
              class="random-string-control"
              :label-col="{ span: 18 }"
              :wrapper-col="{ span: 6 }"
              label-align="left"
              :label="t(`${key}.label`)"
            >
              <a-input-number
                v-model:value="randomString.number[key]"
                class="random-string-input"
                size="small"
                type="number"
                min="0"
                max="100"
                @change="handleGenerate"
              />
            </a-form-item>
            <a-slider
              v-model:value="randomString.number[key]"
              class="random-string-slider"
              :min="0"
              :max="100"
              @change="handleGenerate"
            />

            <!-- 自定义字符串需要的输入框 -->
            <template v-if="key === 'custom'">
              <a-select
                v-model:value="randomString.customSymbol"
                mode="tags"
                :open="false"
                :default-open="false"
                class="custom-words-input"
                :placeholder="t(`custom.placeholder`)"
                :max-tag-text-length="4"
                :max-tag-count="4"
                @change="handleGenerate"
              >
                {{ null }}
              </a-select>
            </template>
          </div>
        </a-form>
      </div>
    </template>
    <template #right>
      <a-spin :spinning="resultSpinning">
        <h-multiline
          :value="randomStringResult"
          :title="t('result')"
        />
      </a-spin>
    </template>
  </h-horizontal-layout>
</template>

<script setup lang="ts">
import { digits, lower, symbols, upper } from "secure-random-password";
import { RedoOutlined } from "@ant-design/icons-vue";
import seedrandom from "seedrandom";
import { debounce } from "lodash";
import { wordList } from "./util";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const $he3 = window.$he3;

/** 随机字符串生成源 */
const RawCharSet: {
  [key: string]: string[] | string | object;
} = {
  lowercased: lower,
  uppercased: upper,
  digits,
  symbols,
  words: wordList,
  separating: {
    none: "",
    space: " ",
    slash: "/",
    spot: ".",
    comma: ",",
    horizontal: "-",
  },
};

/** 随机字符串生成信息 */
const randomString = ref<{
  seed: string;
  amount: number;
  number: {
    uppercased: number;
    lowercased: number;
    symbols: number;
    digits: number;
    words: number;
    separating: number;
    custom: number;
    [key: string]: number;
  };
  separatingSymbol: string;
  customSymbol: string | undefined;
}>({
  seed: Math.floor(Math.random() * new Date().getTime()).toString(),
  amount: 1,
  customSymbol: undefined,
  separatingSymbol: "",
  number: {
    uppercased: 10,
    lowercased: 10,
    symbols: 10,
    digits: 10,
    words: 10,
    separating: 0,
    custom: 0,
  },
});

/** 右侧loadding状态 */
const resultSpinning = ref<boolean>(false);
/** 随机字符串 */
const randomStringResult = ref("");

/** 随机字符串触发函数 */
const handleGenerate = () => {
  if (!resultSpinning.value) {
    resultSpinning.value = true;
  }
  debouncedGenerate();
};

/** 随机字符串防抖处理 */
const debouncedGenerate = debounce(
  () => {
    generate();
  },
  200,
  {
    leading: true,
  }
);

/** 生成随机字符串 */
const generate = () => {
  let string = [];
  const { seed, amount, separatingSymbol, customSymbol, number } =
    randomString.value;
  /** 生成seed函数 */
  const random = seedrandom(seed);

  /** 返回该类型的随机数组 */
  const returnRandomResult = (type: string[] | string | any, num: number) => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(type[Math.floor(random() * type.length)]);
    }
    return result;
  };

  /**
   * 返回一列随机字符串
   * uppercased: 2  =>  resultList: [['C','B']]  =>  resultString: 'CB'
   * 如果后面需要做成渲染颜色，改下数据类型即可
   */
  const generateOneString = () => {
    /** 各类型随机数组 */
    const resultList: string[][] = [];
    /** 随机字符串长度 */
    let resultLength = 0;
    /** 随机字符串 */
    let resultString = "";

    // 通过各类型随机类型生成对应数据
    for (const key in number) {
      if (number[key]) {
        if (key === "custom") {
          if (customSymbol?.length) {
            resultLength += number[key];
            resultList.push(returnRandomResult(customSymbol, number[key]));
          }
          continue;
        }
        if (key === "separating") {
          continue;
        }
        resultList.push(returnRandomResult(RawCharSet[key], number[key]));
        resultLength += number[key];
      }
    }

    // 根据各类型数据生成最终的随机字符串
    for (let i = 0; i < resultLength; i++) {
      const listIndex = Math.floor(random() * resultList.length);
      const indexArray = resultList[listIndex];
      resultString += indexArray.pop();
      // 最后一个填入后需要删除
      if (indexArray.length === 0) {
        resultList.splice(listIndex, 1);
      }

      // 按频率添加分隔符
      if (
        number.separating &&
        separatingSymbol &&
        i % number.separating === 0 &&
        i !== resultLength - 1
      ) {
        resultString += separatingSymbol;
      }
    }

    return resultString;
  };

  // 依次生成随机字符串
  for (let i = 0; i < amount; i++) {
    string.push(generateOneString());
  }
  randomStringResult.value = string.join("\n");
  // 结束loading
  if (resultSpinning.value) {
    resultSpinning.value = false;
  }
};

/** 刷新seed */
const refreshSeed = () => {
  randomString.value.seed = Math.floor(
    Math.random() * new Date().getTime()
  ).toString();
  handleGenerate();
};

setTimeout(() => {
  handleGenerate();
});
</script>

<style scoped lang="less">
.wrapper {
  .number-limit {
    width: 150px;
  }
}

.random-string {
  padding-bottom: 0;

  .ant-form-item {
    margin-bottom: 15px;
  }

  // 输入框样式
  .random-string-control {
    margin-bottom: 5px;
    .ant-form-item-control {
      .random-string-input {
        width: 100%;
      }
      .symbol-control {
        width: 100%;
      }
    }
  }

  // 自定义字符输入样式
  .custom-words-input {
    width: 100%;
    margin-top: -5px;
  }

  // seed刷新按钮样式
  .refresh-button {
    padding: 0 5px;
    height: 100%;
  }

  .random-string-slider {
    padding: 0;
    margin: 0px 6px 10px;
  }
}
:deep .output {
  margin-top: 0;
}
</style>
