import { isUtf32Encoded } from "./src/util";
// 推荐的hook，传入的内容是当前的剪贴板内容，返回 1 ，2， 3， 4， 5， 数字越大，优先级越高
// 如果你的函数判断的很准，就return 大一点，反之就小一点
// 输入是剪贴板的值
function recommandHook(str) {
  if (isUtf32Encoded(str)) {
    return 4;
  } else {
    return 0;
  }
}

export default {
  recommandHook,
};
