export function likeUnicode(text: string) {
  return text.split("\\u").length >= 5;
}
