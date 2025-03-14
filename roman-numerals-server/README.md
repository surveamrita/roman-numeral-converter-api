# Roman Numeral Converter API

A RESTful API service that converts integers to Roman numerals.

## Features

- Endpoint to convert integers (1-3999) to Roman numerals
- Endpoint to monitor health of this service
- Performance Monitoring and Health Check using the Health Check Job that produces daily service health logs
- Comprehensive request and response logging that produces daily access and error logs that help monitor response time, response size and errors.
- Comprehensive Test Coverage using Jest

## Roman Numeral Converter API Endpoint

```
GET /romannumeral?query={integer}
```

### Parameters
- `query`: An integer between 1 and 3999

### Success Response
```json
{
    "input": "42",
    "output": "XLII"
}
```

### Error Responses
- 400 Bad Request: When input is invalid one of the following error messages are possible
  - "Missing query parameter"
  - "Query must be a valid number"
  - "Query must be a whole number"
  - "Number must be between 1 and 3999"

## Health Check Endpoint

The application provides a health check endpoint to monitor the service status and performance metrics.

### Endpoint
```
GET /health
```

### Response Format
```json
{
  "status": "UP",
  "timestamp": "2024-03-11T12:34:56.789Z",
  "uptime": 3600.123,
  "memoryUsage": {
    "rss": 52428800,
    "heapTotal": 34603008,
    "heapUsed": 19972144,
    "external": 1984419,
    "arrayBuffers": 65536,
    "heapUsedMB": 19.05,
    "heapTotalMB": 33.00
  },
  "process": {
    "pid": 12345,
    "version": "v18.15.0",
    "platform": "darwin"
  }
}
```

### Usage
The health check endpoint can be used for:
- Monitoring service availability, usage and response time, etc. with Dashboards
- Load balancer health checks

## Logging System

### Log Files
The application maintains several log files in the `logs` directory with daily rotation:

#### Request Logs
- `access-YYYY-MM-DD.log`: Successful requests (HTTP status < 400)
- `error-YYYY-MM-DD.log`: Failed requests (HTTP status >= 400)
- `health-YYYY-MM-DD.log`: Health check endpoint requests from any client
  ```
  [REQUEST] [2024-03-11T10:30:45.123Z] 127.0.0.1 GET /health status=200 time=5ms memory={"heapUsed":"50.25MB","heapTotal":"100.5MB","rss":"75.3MB"} response={"status":"ok","uptime":3600}
  ```

#### Health Check Job Logs
- `health-job-YYYY-MM-DD.log`: Results from the automated health check job
  ```
  [2024-03-11T10:30:45.123Z] Health check response status: 200
  Health check data: {"status":"ok","uptime":3600,"memory":{"heapUsed":"50.25MB","heapTotal":"100.5MB","rss":"75.3MB"}}
  ```
- `health-job-error-YYYY-MM-DD.log`: Errors from the automated health check job

### Environment-aware Logging
- Development: Additional console logging enabled
- Production: File-only logging for better performance

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```

The test suite includes:
- Basic conversion tests
- Edge case handling
- Error condition testing
- Input validation
- API response format verification

## Dependencies

- express: Web framework
- morgan: HTTP request logger
- jest: Testing framework
- supertest: HTTP testing library
- nodemon: Development auto-reload

## Environment Variables

- `NODE_ENV`: Set to 'production' to disable console logging
- `PORT`: Server port (default: 8080)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 