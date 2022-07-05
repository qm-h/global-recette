import logger from 'node-color-log'

enum LoggerColor {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
}

class Logger {
    public info: (message: string) => void
    public error: (message: string) => void
    public success: (message: string) => void
    public warning: (message: string) => void
    public debug: (message: string) => void

    constructor() {
        this.info = this.infoLogger
        this.error = this.errorLogger
        this.success = this.successLogger
        this.warning = this.warningLogger
        this.debug = this.debugLogger
    }

    private infoLogger(message: string) {
        logger.bgColor(LoggerColor.GREEN).info(message)
    }

    private errorLogger(message: string) {
        logger.bgColor(LoggerColor.RED).error(message)
    }
    private successLogger(message: string) {
        logger.bgColor(LoggerColor.GREEN).success(message)
    }

    private warningLogger(message: string) {
        logger.bgColor(LoggerColor.YELLOW).warn(message)
    }

    private debugLogger(message: string) {
        logger.bgColor(LoggerColor.CYAN).debug(message)
    }
}

export default Logger
