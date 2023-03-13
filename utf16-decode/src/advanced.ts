import { isUtf16Encoded } from "./util";

function recommendHook(str) {
  if (isUtf16Encoded(str)) {
    return 4;
  } else {
    return 0;
  }
}

export default {
  recommendHook,
};
