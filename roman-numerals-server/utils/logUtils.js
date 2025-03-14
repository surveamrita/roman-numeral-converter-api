const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Current date in YYYY-MM-DD format
 */
const getDateString = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
};

/**
 * Get write stream for a specific date's log file
 * @param {string} prefix - Prefix for the log file name
 * @returns {fs.WriteStream} Write stream for the log file
 */
const getLogStream = (prefix) => {
    const date = getDateString();
    const fileName = `${prefix}-${date}.log`;
    return fs.createWriteStream(
        path.join(logsDir, fileName),
        { flags: 'a' }
    );
};

module.exports = {
    getDateString,
    getLogStream
}; 