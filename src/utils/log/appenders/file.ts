import fs, { WriteStream } from 'fs';
import { ILogAppender, LogType } from '../../../interfaces/log';

class FileAppender implements ILogAppender {
  private logFile: WriteStream;

  constructor(filePath: string) {
    this.logFile = fs.createWriteStream(filePath, { flags: 'a' });
  }
  store(type: LogType, text: string): void {
    const errorText = `${type.toUpperCase()}: ${new Date().toLocaleString()} - ${text}\n`;
    this.logFile.write(errorText);
  }
}

export default FileAppender;
