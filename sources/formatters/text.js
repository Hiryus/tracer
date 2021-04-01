const formatTime = require('../utils/format_time');

/**
    Format event as a simple text line.
    Parameter "metadata" is ignored.
    @param {object} time: javascript Date object
    @param {string} level: event level as string
    @param {string} message: log message
*/
module.exports = function format(time, level, message) {
    const date = formatTime(time);
    return `${date}|${level.toUpperCase()}: ${message}`;
};
