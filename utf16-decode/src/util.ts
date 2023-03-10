export function isUtf16Encoded(contents: string): boolean {
  return /^(\\u{[0-9a-f]{2,4}})+$/.test(contents);
}
