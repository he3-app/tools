export function isUtf32Encoded(contents: string): boolean {
  return /^(U\+[0-9a-f]{8})+$/.test(contents);
}
