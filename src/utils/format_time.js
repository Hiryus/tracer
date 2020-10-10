/**
 * Format date into a human-readable, but concise and easily parsable string.
 * @param {object} source: javascript Date object
 */
module.exports = function format(source) {
    const date = `${source.getUTCFullYear()}-${source.getUTCMonth() + 1}-${source.getUTCDate()}`;
    const time = `${source.getUTCHours()}:${source.getUTCMinutes()}:${source.getUTCSeconds()}.${source.getUTCMilliseconds()}`;
    return `${date} ${time}`;
};
