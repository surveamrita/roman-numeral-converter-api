const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const { getDateString, getLogStream } = require('../utils/logUtils');

// Create custom tokens for logging
logger.token('timestamp', () => {
    return new Date().toISOString();
});

logger.token('responseData', (req, res) => {
    if (res.statusCode === 200) {
        return JSON.stringify(res._responseData || '');
    }
    return '';
});

logger.token('responseSize', (req, res) => {
    if (res._responseData) {
        return Buffer.byteLength(JSON.stringify(res._responseData), 'utf8');
    }
    return 0;
});

logger.token('requestBody', (req) => {
    return JSON.stringify(req.body) || '';
});

logger.token('userAgent', (req) => {
    return req.headers['user-agent'] || '';
});

logger.token('ip', (req) => {
    return req.ip || req.connection.remoteAddress;
});

logger.token('memoryUsage', () => {
    const used = process.memoryUsage();
    return JSON.stringify({
        heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100 + 'MB',
        heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100 + 'MB',
        rss: Math.round(used.rss / 1024 / 1024 * 100) / 100 + 'MB'
    });
});

/**
 * Success log format
 * @type {string}
 */
const successLogFormat = [
    '[:timestamp]',
    ':ip',
    ':method :url',
    'status=:status',
    'time=:response-time[0]ms',
    'size=:responseSize',
    'agent=:userAgent',
    'body=:requestBody',
    'response=:responseData'
].join(' ');

/**
 * Error log format
 * @type {string}
 */
const errorLogFormat = [
    '[:timestamp]',
    ':ip',
    ':method :url',
    'status=:status',
    'time=:response-time[0]ms',
    'agent=:userAgent',
    'body=:requestBody'
].join(' ');

/**
 * Health check log format, includes [REQUEST] prefix to distinguish from healthCheckJob logs
 * @type {string}
 */
const healthCheckFormat = [
    '[REQUEST]',
    '[:timestamp]',
    ':ip',
    ':method :url',
    'status=:status',
    'time=:response-time[0]ms',
    'memory=:memoryUsage',
    'response=:responseData'
].join(' ');

/**
 * Middleware to capture response data
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
const responseDataMiddleware = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        res._responseData = data;
        return originalJson.call(this, data);
    };

    // Add request timestamp
    req._requestTime = Date.now();

    // Log request body for debugging
    if (Object.keys(req.body || {}).length > 0) {
        console.debug('Request Body:', req.body);
    }

    // Log response time on finish
    res.on('finish', () => {
        const duration = Date.now() - req._requestTime;
        if (duration > 1000) { // Log slow requests (>1s)
            console.warn(`Slow request detected: ${req.method} ${req.url} took ${duration}ms`);
        }
    });

    next();
};

/**
 * Error logging middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void}
 */
const errorLoggingMiddleware = (err, req, res, next) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        error: err.message,
        stack: err.stack,
        method: req.method,
        url: req.url,
        body: req.body,
        ip: req.ip
    };

    // Write to current day's error log file
    getLogStream('error').write(JSON.stringify(errorLog) + '\n');

    // Continue with error handling
    next(err);
};

/**
 * Configure logging middleware
 * @param {Object} app - The Express application object
 * @returns {void}
 */
const configureLogging = (app) => {
    // Apply middleware
    app.use(responseDataMiddleware);
    
    // Health check logging
    app.use(logger(healthCheckFormat, {
        stream: getLogStream('health'),
        skip: (req) => !req.url.startsWith('/health')
    }));

    // Success logging to daily access log file
    app.use(logger(successLogFormat, {
        stream: getLogStream('access'),
        skip: (req, res) => res.statusCode >= 400 || req.url.startsWith('/health')
    }));

    // Error logging to daily error log file
    app.use(logger(errorLogFormat, {
        stream: getLogStream('error'),
        skip: (req, res) => res.statusCode < 400 || req.url.startsWith('/health')
    }));

    // Console logging for development
    if (process.env.NODE_ENV !== 'production') {
        app.use(logger('dev'));
    }

    // Error logging middleware
    app.use(errorLoggingMiddleware);
};

module.exports = configureLogging; 