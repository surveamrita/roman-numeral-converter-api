# Roman Numeral Converter API

A RESTful API service that converts integers to Roman numerals.

## Running Locally

1. Start the server:
```bash
cd roman-numerals-server
npm install
npm start
```

2. In a new terminal, start the client:
```bash
cd roman-numerals-client
npm install
npm start
```

The application will be available at http://localhost:3000

## Running with Docker

### Local Development
```bash
docker-compose up --build
```

### Running on Play with Docker (PWD)
1. Get your PWD URL from the browser (e.g., http://ip172-18-0-81-cva21da91nsg00cmmtn0-8080.direct.labs.play-with-docker.com)

2. Set the API URL environment variable:
```bash
export API_URL=http://ip172-18-0-81-cva21da91nsg00cmmtn0-8080.direct.labs.play-with-docker.com
```

3. Run Docker Compose:
```bash
docker-compose up --build
```

## Accessing the Application
- Client: http://localhost:3000 (local) or PWD URL on port 3000
- Server: http://localhost:8080 (local) or PWD URL on port 8080
