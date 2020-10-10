const formatTime = require('../utils/format_time');

/**
    Format event as JSON.
    @param {object} time: javascript Date object
    @param {string} level: log level as string
    @param {string} message: event message
    @param {object} metadata: extra data as plain object
*/
module.exports = function format(time, level, message, metadata, indent = null) {
    const date = formatTime(time);
    const timestamp = time.getTime();
    return JSON.stringify({ timestamp, date, level, message, ...metadata }, null, indent);
};
