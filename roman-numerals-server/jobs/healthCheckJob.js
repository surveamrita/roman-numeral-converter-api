const fetch = require('node-fetch');
const { HEALTH, SERVER } = require('../config/constants');
const { getLogStream } = require('../utils/logUtils');

/**
 * Function to perform health check
 * @returns {void}
 * 
 * The health check job performs a health check on the server in interval of 10 seconds by calling the /health endpoint
 * and logs the result to the health-job log file.
 */
const performHealthCheck = async () => {
    try {
        const response = await fetch(`${SERVER.URL}${HEALTH.ENDPOINT}`);
        const data = await response.json();
        
        const logEntry = {
            timestamp: new Date().toISOString(),
            status: response.status,
            data: data
        };

        // Write to health check job log
        const stream = getLogStream('health-job');
        stream.write(JSON.stringify(logEntry) + '\n');
        stream.end();

        // Log to console in development
        if (process.env.NODE_ENV !== 'production') {
            console.log('Health Check Job:', logEntry);
        }
    } catch (error) {
        const errorLog = {
            timestamp: new Date().toISOString(),
            error: error.message,
            stack: error.stack
        };

        // Write error to health check job log
        const stream = getLogStream('health-job-error');
        stream.write(JSON.stringify(errorLog) + '\n');
        stream.end();

        // Log error to console in development
        if (process.env.NODE_ENV !== 'production') {
            console.error('Health Check Job Error:', errorLog);
        }
    }
};

// Start the health check job
const startHealthCheckJob = () => {
    // Perform initial health check
    performHealthCheck();

    // Schedule periodic health checks
    setInterval(performHealthCheck, HEALTH.CHECK_INTERVAL);
};

module.exports = startHealthCheckJob; 