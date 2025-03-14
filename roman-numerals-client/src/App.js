import React, { useState } from 'react';
import {
  Provider,
  defaultTheme,
  darkTheme,
  Flex,
  View
} from '@adobe/react-spectrum';
import RomanNumeralComponent from './pages/home/RomanNumeralComponent';
import ErrorBoundary from './pages/error/ErrorBoundary';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Provider theme={isDarkMode ? darkTheme : defaultTheme} colorScheme={isDarkMode ? "dark" : "light"} height="100vh">
      <ErrorBoundary>
        <View
          className={`app-container ${!isDarkMode ? 'light-theme' : ''}`}
          height="100%" // Full height to ensure the content can be centered
          display="flex"
          justifyContent="center" // Center content vertically
          alignItems="center" // Center content horizontally
          padding="size-300" // Add padding to the top of the container
        >
          <Flex
            className="app-content"
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            direction="column"
            width="100%"
            maxWidth="800px"
            margin="0 auto"
          >
            <RomanNumeralComponent 
              isDarkMode={isDarkMode}
              onThemeChange={() => setIsDarkMode(!isDarkMode)}
            />
          </Flex>
        </View>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
