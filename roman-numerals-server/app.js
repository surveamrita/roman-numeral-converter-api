const express = require('express');
const cors = require('cors');
const app = express();

// Import routers and middleware
const romanNumeralRouter = require('./routes/romanNumeral');
const healthCheckRouter = require('./routes/healthCheck');
const configureLogging = require('./routes/logging');
const startHealthCheckJob = require('./jobs/healthCheckJob');
const { SERVER } = require('./config/constants');

// Enable CORS for all routes
app.use(cors());

// Configure logging
configureLogging(app);

// Start health check job
startHealthCheckJob();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/romannumeral', romanNumeralRouter);
app.use('/health', healthCheckRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(SERVER.PORT, () => {
  console.log(`Server is running on port ${SERVER.PORT}`);
});

module.exports = app; 