/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const AbstractLogger = require('./abstract.class');

class FileLogger extends AbstractLogger {
    /**
        @param {array} levels: the log levels which are managed by this logger (as strings)
        @param {string} format: the log format to use
        @param {string} file: path to the log file
    */
    constructor(levels, format, file) {
        super(levels, format);

        if (typeof file !== 'string') {
            throw new Error('logger path must be a string');
        }

        this.dir = path.dirname(file);
        this.file = file;
    }

    /**
       Write a log line to the log file.

       We avoid using promises in this function since they would resolve next tick.
       Next tick may be too late: the application may crashed before and logs would be lost.

       If fs.mkdir() fails, the error is ignored and logger still tries to log to file.
       If writing to file fails, the error is written on console and the log is lost.

       @param {string} line: the log line to write
    */
    write(line) {
        fs.mkdir(this.dir, { recursive: true }, () => {
            fs.appendFile(this.file, `${line}\n`, 'utf8', (err) => {
                if (err) {
                    console.error(`failed to write to file "${this.file}": ${err.stack || err}`);
                }
            });
        });
    }
}

module.exports = FileLogger;
