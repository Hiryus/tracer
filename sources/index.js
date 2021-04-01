const ConsoleLogger = require('./loggers/console.class');
const FileLogger = require('./loggers/file.class');

const loggers = {
    list: [{
        levels: ['fatal', 'error', 'warning', 'info', 'debug', 'trace', 'access'],
        type: 'console',
        format: 'text',
    }],

    get() {
        return this.list;
    },

    forEach(callback) {
        this.list.forEach(callback);
        return this;
    },

    add({ levels, type, format, path }) {
        switch (type) {
            case 'console':
                this.list.push(new ConsoleLogger(levels, format));
                break;
            case 'file':
                this.list.push(new FileLogger(levels, format, path));
                break;
            default:
                throw new Error(`unknown logger type: ${type}`);
        }
        return this;
    },

    clear() {
        this.list.length = 0;
        return this;
    },

    set(newLoggers) {
        if (!Array.isArray(newLoggers)) {
            throw new Error('set() expects an array of loggers');
        }

        this.clear();
        newLoggers.forEach((logger) => this.add(logger));

        return this;
    },
};

/**
 * Add a new applicative log line.
 * @param {string} level: log level as string
 * @param {string} message: event message
 * @param {object} metadata: optional metadata object
 */
function log(level, message, metadata) {
    if (typeof level !== 'string') {
        throw new Error('level must be a string');
    }
    if (message && typeof message !== 'string') {
        throw new Error('if set, message must be a string');
    }
    if (metadata && typeof metadata !== 'object') {
        throw new Error('if set, metadata must be a plain object');
    }

    const time = new Date();
    loggers.forEach((logger) => logger.log(time, level, message, metadata));
}

/**
 * Wrappers for log().
 */
function access(...args) {
    return log('access', ...args);
}
function trace(...args) {
    return log('trace', ...args);
}
function debug(...args) {
    return log('debug', ...args);
}
function info(...args) {
    return log('info', ...args);
}
function warn(...args) {
    return log('warning', ...args);
}
function error(...args) {
    return log('error', ...args);
}
function fatal(...args) {
    return log('fatal', ...args);
}

module.exports = { loggers, log, access, trace, debug, info, warn, error, fatal };
