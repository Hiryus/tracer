const textFormatter = require('../formatters/text');
const jsonFormatter = require('../formatters/json');

function getFormatter(format) {
    switch (format) {
        case 'text':
            return (...args) => textFormatter(...args);
        case 'json.raw':
            return (...args) => jsonFormatter(...args);
        case 'json.pretty':
            return (...args) => jsonFormatter(...args, /* indent = */ 2);
        default:
            throw new Error(`unknown format: ${format}`);
    }
}

class AbstractLogger {
    /**
        @param {array} levels: the log levels which are managed by this logger (as strings)
        @param {string} format: the log format to use
    */
    constructor(levels, format) {
        if (!Array.isArray(levels)) {
            throw new Error('logger levels must be an array of strings (array of log levels)');
        }
        if (levels.length === 0) {
            throw new Error('logger must have at least one log level');
        }

        this.levels = levels;
        this.format = getFormatter(format);
    }

    /**
        Add an event log.
        Parameters are directly passed to the formater and also to the write() function as metadata.
        @param {object} time: javascript Date object
        @param {string} level: log level as string
        @param {string} message: event message
        @param {object} metadata: extra data as plain object
    */
    log(time, level, message, metadata) {
        if (this.levels.includes(level)) {
            const line = this.format(time, level, message, metadata);
            this.write(line, level);
        }
    }

    /**
        Write a log line.
        @param {string} line: the log line to write
        @param {string} level: log level as a string
    */
    write(line, level) { // eslint-disable-line no-unused-vars
        throw new Error(`${this.constructor.name} has no implementation for the log() method`);
    }
}

module.exports = AbstractLogger;
