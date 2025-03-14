/**
 * Application-wide constants
 */

// Server configuration
const SERVER = {
  PORT: process.env.PORT || 8080,
  ENV: process.env.NODE_ENV || 'development',
  URL: process.env.REACT_APP_API_URL || 'http://localhost:8080'
};

// Health check configuration
const HEALTH = {
  STATUS: {
    UP: 'UP',
    DOWN: 'DOWN'
  },
  CHECK_INTERVAL: 30000, // 30 seconds
  ENDPOINT: '/health'
};

// Performance thresholds
const PERFORMANCE = {
  SLOW_REQUEST_THRESHOLD: 1000 // 1 second
};

// Export all constants
module.exports = {
  SERVER,
  HEALTH,
  PERFORMANCE
}; 