import { isUtf32Encoded } from "./util";

function recommendHook(str) {
  if (isUtf32Encoded(str)) {
    return 4;
  } else {
    return 0;
  }
}

export default {
  recommendHook,
};
