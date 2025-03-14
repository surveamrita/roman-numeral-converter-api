import React, { useState, useEffect } from 'react';
import {
  View,
  Heading,
  Text,
  Button,
  Flex,
  Icon
} from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';
import '../../css/ErrorBoundary.css';

const ErrorFallbackUI = ({ error, resetErrorBoundary }) => {
  return (
    <View className="error-container">
      <Icon className="error-icon">
        <Alert />
      </Icon>
      <Heading level={2} className="error-title">Something went wrong</Heading>
      <Text className="error-message">
        {error.message || 'An unexpected error occurred'}
      </Text>
      <View className="error-details">
        <Text>{error.stack}</Text>
      </View>
      <Flex className="error-actions">
        <Button variant="primary" onPress={resetErrorBoundary}>
          Try again
        </Button>
        <Button variant="secondary" onPress={() => window.location.reload()}>
          Refresh page
        </Button>
      </Flex>
    </View>
  );
};

/**
 * @param {children} React.ReactNode
 * @returns {React.ReactNode}
 * @description This component is responsible for catching errors in the children components and rendering 
 * the ErrorFallbackUI in case of an error
 */
const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setError(error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return <ErrorFallbackUI error={error} resetErrorBoundary={() => setError(null)} />;
  }

  return children;
};

export default ErrorBoundary; 