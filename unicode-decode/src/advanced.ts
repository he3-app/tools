import { likeUnicode } from "./util";

function recommendHook(str) {
  if (likeUnicode(str)) {
    return 3;
  } else {
    return 0;
  }
}

export default {
  recommendHook,
};
