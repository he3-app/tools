<template>
  <h-layout-single class="ascii" :max-width="1280">
    <div v-if="showTips" class="ascii-tips">
      <a @click="jumpToMain">{{ t(`prompt`) }}</a>
    </div>
    <div v-else class="ascii-main">
      <div class="ascii-main-char">{{ key }}</div>
      <div class="ascii-main-ascii">{{ ascii }}</div>
    </div>
    <table class="ascii-table" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th class="ascii-table-seperate-color">{{ t(`value`) }}</th>
          <th>{{ t(`character`) }}</th>
          <th class="ascii-table-seperate-color">{{ t(`value`) }}</th>
          <th>{{ t(`character`) }}</th>
          <th class="ascii-table-seperate-color">{{ t(`value`) }}</th>
          <th>{{ t(`character`) }}</th>
          <th class="ascii-table-seperate-color">{{ t(`value`) }}</th>
          <th>{{ t(`character`) }}</th>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">0</td>
          <td>NUT</td>
          <td class="ascii-table-seperate-color">32</td>
          <td>(space)</td>
          <td class="ascii-table-seperate-color">64</td>
          <td>@</td>
          <td class="ascii-table-seperate-color">96</td>
          <td>、</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">1</td>
          <td>SOH</td>
          <td class="ascii-table-seperate-color">33</td>
          <td>!</td>
          <td class="ascii-table-seperate-color">65</td>
          <td>A</td>
          <td class="ascii-table-seperate-color">97</td>
          <td>a</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">2</td>
          <td>STX</td>
          <td class="ascii-table-seperate-color">34</td>
          <td>"</td>
          <td class="ascii-table-seperate-color">66</td>
          <td>B</td>
          <td class="ascii-table-seperate-color">98</td>
          <td>b</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">3</td>
          <td>ETX</td>
          <td class="ascii-table-seperate-color">35</td>
          <td>#</td>
          <td class="ascii-table-seperate-color">67</td>
          <td>C</td>
          <td class="ascii-table-seperate-color">99</td>
          <td>c</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">4</td>
          <td>EOT</td>
          <td class="ascii-table-seperate-color">36</td>
          <td>$</td>
          <td class="ascii-table-seperate-color">68</td>
          <td>D</td>
          <td class="ascii-table-seperate-color">100</td>
          <td>d</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">5</td>
          <td>ENQ</td>
          <td class="ascii-table-seperate-color">37</td>
          <td>%</td>
          <td class="ascii-table-seperate-color">69</td>
          <td>E</td>
          <td class="ascii-table-seperate-color">101</td>
          <td>e</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">6</td>
          <td>ACK</td>
          <td class="ascii-table-seperate-color">38</td>
          <td>&amp;</td>
          <td class="ascii-table-seperate-color">70</td>
          <td>F</td>
          <td class="ascii-table-seperate-color">102</td>
          <td>f</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">7</td>
          <td>BEL</td>
          <td class="ascii-table-seperate-color">39</td>
          <td>,</td>
          <td class="ascii-table-seperate-color">71</td>
          <td>G</td>
          <td class="ascii-table-seperate-color">103</td>
          <td>g</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">8</td>
          <td>BS</td>
          <td class="ascii-table-seperate-color">40</td>
          <td>(</td>
          <td class="ascii-table-seperate-color">72</td>
          <td>H</td>
          <td class="ascii-table-seperate-color">104</td>
          <td>h</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">9</td>
          <td>HT</td>
          <td class="ascii-table-seperate-color">41</td>
          <td>)</td>
          <td class="ascii-table-seperate-color">73</td>
          <td>I</td>
          <td class="ascii-table-seperate-color">105</td>
          <td>i</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">10</td>
          <td>LF</td>
          <td class="ascii-table-seperate-color">42</td>
          <td>*</td>
          <td class="ascii-table-seperate-color">74</td>
          <td>J</td>
          <td class="ascii-table-seperate-color">106</td>
          <td>j</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">11</td>
          <td>VT</td>
          <td class="ascii-table-seperate-color">43</td>
          <td>+</td>
          <td class="ascii-table-seperate-color">75</td>
          <td>K</td>
          <td class="ascii-table-seperate-color">107</td>
          <td>k</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">12</td>
          <td>FF</td>
          <td class="ascii-table-seperate-color">44</td>
          <td>,</td>
          <td class="ascii-table-seperate-color">76</td>
          <td>L</td>
          <td class="ascii-table-seperate-color">108</td>
          <td>l</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">13</td>
          <td>CR</td>
          <td class="ascii-table-seperate-color">45</td>
          <td>-</td>
          <td class="ascii-table-seperate-color">77</td>
          <td>M</td>
          <td class="ascii-table-seperate-color">109</td>
          <td>m</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">14</td>
          <td>SO</td>
          <td class="ascii-table-seperate-color">46</td>
          <td>.</td>
          <td class="ascii-table-seperate-color">78</td>
          <td>N</td>
          <td class="ascii-table-seperate-color">110</td>
          <td>n</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">15</td>
          <td>SI</td>
          <td class="ascii-table-seperate-color">47</td>
          <td>/</td>
          <td class="ascii-table-seperate-color">79</td>
          <td>O</td>
          <td class="ascii-table-seperate-color">111</td>
          <td>o</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">16</td>
          <td>DLE</td>
          <td class="ascii-table-seperate-color">48</td>
          <td>0</td>
          <td class="ascii-table-seperate-color">80</td>
          <td>P</td>
          <td class="ascii-table-seperate-color">112</td>
          <td>p</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">17</td>
          <td>DCI</td>
          <td class="ascii-table-seperate-color">49</td>
          <td>1</td>
          <td class="ascii-table-seperate-color">81</td>
          <td>Q</td>
          <td class="ascii-table-seperate-color">113</td>
          <td>q</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">18</td>
          <td>DC2</td>
          <td class="ascii-table-seperate-color">50</td>
          <td>2</td>
          <td class="ascii-table-seperate-color">82</td>
          <td>R</td>
          <td class="ascii-table-seperate-color">114</td>
          <td>r</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">19</td>
          <td>DC3</td>
          <td class="ascii-table-seperate-color">51</td>
          <td>3</td>
          <td class="ascii-table-seperate-color">83</td>
          <td>S</td>
          <td class="ascii-table-seperate-color">115</td>
          <td>s</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">20</td>
          <td>DC4</td>
          <td class="ascii-table-seperate-color">52</td>
          <td>4</td>
          <td class="ascii-table-seperate-color">84</td>
          <td>T</td>
          <td class="ascii-table-seperate-color">116</td>
          <td>t</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">21</td>
          <td>NAK</td>
          <td class="ascii-table-seperate-color">53</td>
          <td>5</td>
          <td class="ascii-table-seperate-color">85</td>
          <td>U</td>
          <td class="ascii-table-seperate-color">117</td>
          <td>u</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">22</td>
          <td>SYN</td>
          <td class="ascii-table-seperate-color">54</td>
          <td>6</td>
          <td class="ascii-table-seperate-color">86</td>
          <td>V</td>
          <td class="ascii-table-seperate-color">118</td>
          <td>v</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">23</td>
          <td>TB</td>
          <td class="ascii-table-seperate-color">55</td>
          <td>7</td>
          <td class="ascii-table-seperate-color">87</td>
          <td>W</td>
          <td class="ascii-table-seperate-color">119</td>
          <td>w</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">24</td>
          <td>CAN</td>
          <td class="ascii-table-seperate-color">56</td>
          <td>8</td>
          <td class="ascii-table-seperate-color">88</td>
          <td>X</td>
          <td class="ascii-table-seperate-color">120</td>
          <td>x</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">25</td>
          <td>EM</td>
          <td class="ascii-table-seperate-color">57</td>
          <td>9</td>
          <td class="ascii-table-seperate-color">89</td>
          <td>Y</td>
          <td class="ascii-table-seperate-color">121</td>
          <td>y</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">26</td>
          <td>SUB</td>
          <td class="ascii-table-seperate-color">58</td>
          <td>:</td>
          <td class="ascii-table-seperate-color">90</td>
          <td>Z</td>
          <td class="ascii-table-seperate-color">122</td>
          <td>z</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">27</td>
          <td>ESC</td>
          <td class="ascii-table-seperate-color">59</td>
          <td>;</td>
          <td class="ascii-table-seperate-color">91</td>
          <td>[</td>
          <td class="ascii-table-seperate-color">123</td>
          <td>{</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">28</td>
          <td>FS</td>
          <td class="ascii-table-seperate-color">60</td>
          <td>&lt;</td>
          <td class="ascii-table-seperate-color">92</td>
          <td>\</td>
          <td class="ascii-table-seperate-color">124</td>
          <td>|</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">29</td>
          <td>GS</td>
          <td class="ascii-table-seperate-color">61</td>
          <td>=</td>
          <td class="ascii-table-seperate-color">93</td>
          <td>]</td>
          <td class="ascii-table-seperate-color">125</td>
          <td>}</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">30</td>
          <td>RS</td>
          <td class="ascii-table-seperate-color">62</td>
          <td>&gt;</td>
          <td class="ascii-table-seperate-color">94</td>
          <td>^</td>
          <td class="ascii-table-seperate-color">126</td>
          <td>`</td>
        </tr>
        <tr>
          <td class="ascii-table-seperate-color">31</td>
          <td>US</td>
          <td class="ascii-table-seperate-color">63</td>
          <td>?</td>
          <td class="ascii-table-seperate-color">95</td>
          <td>_</td>
          <td class="ascii-table-seperate-color">127</td>
          <td>DEL</td>
        </tr>
      </tbody>
    </table>
  </h-layout-single>
</template>

<script setup lang="ts">

import { useEventListener } from "@vueuse/core";

import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import messages from "./lang.json";
const { t } = useI18n({
  locale: window.$he3.lang,
  messages,
});
const $he3 = window.$he3;

const specialCharMap = {
  Escape: 27,
  Space: 32,
  Backspace: 8,
};
const showTips = ref(true);
const key = ref("a");
const ascii = ref(65);

function jumpToMain() {
  showTips.value = false;
}

onMounted(() => {
  useEventListener(window, "keydown", (win, event) => {
    showTips.value = false;

    key.value = win.key;

    let charCode = -1;
    if (win.key.length == 1) {
      charCode = win.key.charCodeAt(0);
    } else {
      if (specialCharMap[win.key] !== undefined) {
        charCode = specialCharMap[win.key];
      }
    }
    if (charCode >= 0 && charCode <= 127) {
      ascii.value = charCode;
    } else {
      ascii.value = "null";
    }
  });
});
</script>

<style scoped lang="less">
.ascii {
  text-align: center;

  &-tips {
    height: 15vh;
    display: flex;
    justify-content: space-around;
    font-size: 6vmin;
  }

  &-main {
    height: 15vh;
    display: flex;
    justify-content: space-around;
    font-size: 10vmin;

    &-char {
      // background-color: lightcoral;
    }
    &-ascii {
      color: #52c41a;
    }
  }
  &-table {
    &-seperate-color {
      background-color: var(--primary-bg-color);
    }
  }
}
</style>
