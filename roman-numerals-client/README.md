# Roman Numeral Converter - Client

A modern React application that provides a user-friendly interface for converting integers to Roman numerals. Built with React and Adobe's React Spectrum design system.

## Features

- **Integer to Roman Numeral Conversion**: Convert integers (1-3999) to their Roman numeral equivalents
- **Dark/Light Theme Toggle**: Switch between dark and light modes for comfortable viewing
- **Modern UI and Responsive Design**: Built with Adobe's React Spectrum components
- **Error Handling**: Graceful handling of invalid inputs and server errors
- **Testing**: Comprehensive tests using Jest and React Testing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd roman-numerals-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- **Start Development Server**:
  ```bash
  npm start
  ```
  Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

- **Run Tests**:
  ```bash
  npm test
  ```
  Launches the test runner in interactive watch mode

- **Run Test Coverage**:
  ```bash
  npm run test:coverage
  ```
  Generates a coverage report for the test suite

- **Build for Production**:
  ```bash
  npm run build
  ```
  Creates an optimized production build in the `build` folder

## Component Documentation

### RomanNumeralComponent
- Handles user input for integer conversion
- Validates input range (1-3999)
- Displays converted Roman numerals
- Shows appropriate error messages for invalid inputs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Submit a pull request
