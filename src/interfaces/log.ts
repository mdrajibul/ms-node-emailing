export interface ILogAppender {
  store(type: LogType, text: string): void;
}

export enum LogType {
  LOG = 'log',
  INFO = 'info',
  WARN = 'warn',
  DEBUG = 'debug',
  ERROR = 'error'
}
