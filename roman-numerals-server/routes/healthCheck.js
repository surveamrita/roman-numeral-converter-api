const express = require('express');
const router = express.Router();
const { HEALTH } = require('../config/constants');

// Health check endpoint
router.get('/', (req, res) => {
  const healthData = {
    status: HEALTH.STATUS.UP,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: {
      ...process.memoryUsage(),
      // Convert bytes to MB for better readability
      heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      heapTotalMB: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
    },
    process: {
      pid: process.pid,
      version: process.version,
      platform: process.platform
    }
  };

  res.status(200).json(healthData);
});

module.exports = router; 