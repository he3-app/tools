export function isDark(): boolean {
  const currentTheme = getTheme();
  switch (true) {
    case currentTheme === "dark":
      return true;
    case currentTheme === "light":
      return false;
    case currentTheme === "system":
      return isDarkModeHandler();
    default:
      throw new Error("Unknown theme");
  }
}
const THEME_KEY = "theme";
export function getTheme() {
  const value = localStorage.getItem(THEME_KEY);
  if (value) {
    return value;
  } else {
    localStorage.setItem(THEME_KEY, "system");
    return "system";
  }
}
export function isDarkModeHandler(): boolean {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches;
}
