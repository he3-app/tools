import { likeIDN } from "./util";

function recommendHook(str) {
  if (likeIDN(str)) {
    return 5;
  } else {
    return 0;
  }
}

export default {
  recommendHook,
};
