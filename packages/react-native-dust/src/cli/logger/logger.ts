import { c } from './format.js';

enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export const debug = {
  isEnabled: false,
  setEnabled(enabled: boolean) {
    if (enabled) {
      console.log(c.brown.bold('Debug logging enabled'));
    }
    this.isEnabled = enabled;
  },
};

const log = (level: LogLevel, message: string): void => {
  if (level === LogLevel.DEBUG && !debug.isEnabled) return;

  switch (level) {
    case LogLevel.ERROR:
      console.error(message);
      break;
    case LogLevel.WARN:
      console.warn(message);
      break;
    case LogLevel.INFO:
      console.info(message);
      break;
    case LogLevel.DEBUG:
      console.debug(c.brown('[DEBUG] ') + message);
      break;
  }
};

export const logger = {
  error: (message: string) => log(LogLevel.ERROR, message),
  warn: (message: string) => log(LogLevel.WARN, message),
  info: (message: string) => log(LogLevel.INFO, message),
  debug: (message: string) => log(LogLevel.DEBUG, message),
};
