import { isUtf8Encoded } from "./util";

function recommendHook(str) {
  if (isUtf8Encoded(str)) {
    return 4;
  } else {
    return 0;
  }
}

export default {
  recommendHook,
};
