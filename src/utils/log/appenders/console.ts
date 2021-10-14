import { ILogAppender, LogType } from "../../../interfaces/log";

class ConsoleAppender implements ILogAppender {
    store(type: LogType, text: string): void {
        const errorText = `${type.toUpperCase()}: ${new Date().toLocaleString()} - ${text}`;
        console[type](errorText);
    }
}

export default ConsoleAppender;
