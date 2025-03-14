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
# Replace with your PWD URL
export PWD_URL=http://ip172-18-0-81-cva21da91nsg00cmmtn0-8080.direct.labs.play-with-docker.com

# Update docker-compose.yml temporarily
sed -i "s|http://server:8080|$PWD_URL|g" docker-compose.yml

# Run docker-compose
docker-compose up --build
```

3. Run Docker Compose:
```bash
docker-compose up --build
```

## Accessing the Application
- Client: http://localhost:3000 (local) or PWD URL on port 3000
- Server: http://localhost:8080 (local) or PWD URL on port 8080
