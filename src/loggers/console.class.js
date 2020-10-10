/* eslint-disable no-console */

const AbstractLogger = require('./abstract.class');

class ConsoleLogger extends AbstractLogger {
    /**
        Write a log line to the console (stdout / stderr).
        The corresponding console function (debug(), error()...) is used if it exist.
        @param {string} line: the log line to write
        @param {string} level: log level as a string
    */
    write(line, level) {
        switch (level.toLowerCase()) {
            case 'error':
                return console.error(line);
            case 'warning':
                return console.warn(line);
            case 'info':
                return console.info(line);
            case 'debug':
                return console.debug(line);
            default:
                return console.log(line);
        }
    }
}

module.exports = ConsoleLogger;
