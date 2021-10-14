import { ProjectConfig } from '@mdrajibul/cloud-config-utils';
import { ILogAppender, LogType } from '../../interfaces/log';
import ConsoleAppender from './appenders/console';
import FileAppender from './appenders/file';

class Log {
  private static appenders: ILogAppender[] = [];
  private static isInitialized = false;

  static log(text: string): void {
    this.saveLog(LogType.LOG, text);
  }
  static info(text: string): void {
    this.saveLog(LogType.INFO, text);
  }
  static warn(text: string): void {
    this.saveLog(LogType.WARN, text);
  }
  static debug(text: string): void {
    this.saveLog(LogType.DEBUG, text);
  }
  static error(text: string): void {
    this.saveLog(LogType.ERROR, text);
  }

  private static init() {
    if (ProjectConfig.configs['log.enable']) {
      const consoleAppender = ProjectConfig.configs['log.appenders.console'];
      const fileAppender: string[] = ProjectConfig.configs['log.appenders.file'];

      if (consoleAppender) {
        this.appenders.push(new ConsoleAppender());
      }
      if (fileAppender) {
        this.appenders.push(new FileAppender(ProjectConfig.configs['log.filePath'] || './applictaion.log'));
      }
      this.isInitialized = true;
    }
  }

  private static saveLog(type: LogType, text: string) {
    if (!this.isInitialized) {
      this.init();
    }
    this.appenders.forEach(appender => {
      appender.store(type, text);
    });
  }
}

export default Log;
