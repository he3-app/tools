declare interface Window {
  $he3: {
    getTheme: () => Promise<'dark' | 'light'>;
    subscribeThemeChange: (theme: (boolean) => void) => void;
    downloadByUrl: (url: string) => void;
    readFileByUrl: (path: string) => string;
    getLang: () => Promise<string>;
    getToolInfo: () => Promise<string>;
    getLastClipboard: () => Promise<any>;
    onUseClipboardValue: () => void;
    lang: string;
    message: {
      success;
      warn;
      error;
    };
  };
}
