let isDebugEnabled = false;

export function setDebugMode(enabled: boolean): void {
  isDebugEnabled = enabled;
}

export function debug(...args: any[]): void {
  if (isDebugEnabled) {
    console.log('[DEBUG]', ...args);
  }
}

export function isDebugMode(): boolean {
  return isDebugEnabled;
}