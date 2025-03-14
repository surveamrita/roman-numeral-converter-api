import React, { useState, useCallback, useEffect } from 'react';
import {
  Form,
  TextField,
  Button,
  Text,
  Flex,
  View,
  StatusLight,
  Well,
  Heading,
  Divider,
  AlertDialog,
  DialogTrigger,
  Content,
  ActionButton
} from '@adobe/react-spectrum';
import Light from '@spectrum-icons/workflow/Light';
import Moon from '@spectrum-icons/workflow/Moon';
import '../../css/RomanNumeral.css';

// Helper functions
const validateInput = (input) => {
  if (!input) return 'Missing query parameter';
  const number = parseInt(input);
  if (isNaN(number)) return 'Query must be a valid number';
  if (!Number.isInteger(number)) return 'Query must be a whole number';
  if (number < 1 || number > 3999) return 'Number must be between 1 and 3999';
  return null;
};

const getApiUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
  return apiUrl.trim();
};

const RomanNumeralComponent = ({ isDarkMode, onThemeChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleApiResponse = useCallback(async (response) => {
    const data = await response.text();
    if (!response.ok) {
      setErrorMessage(data);
      setShowErrorDialog(true);
      return null;
    }
    return JSON.parse(data);
  }, []);

  const convertToRomanNumeral = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setErrorMessage('');
    setShowErrorDialog(false);

    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/romannumeral?query=${inputValue}`);
      const data = await handleApiResponse(response);
      if (data) setResult(data.output);
    } catch (err) {
      setErrorMessage('Unable to connect to the server. Please try again later.');
      setShowErrorDialog(true);
    } finally {
      setLoading(false);
    }
  }, [inputValue, handleApiResponse]);

  return (
    <View className="converter-container">
      {/* Error Dialog */}
      <DialogTrigger isOpen={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <></>
        <AlertDialog
          title="Error"
          variant="error"
          primaryActionLabel="OK"
        >
          <Content>
            <Flex direction="column" gap="size-100">
              <Text>{errorMessage}</Text>
              <Text className="error-text">
                If this problem persists, please contact support.
              </Text>
            </Flex>
          </Content>
        </AlertDialog>
      </DialogTrigger>

      <Flex className="header">
        <View flex="1">
          <Heading level={1}>Roman Numeral Converter</Heading>
        </View>
        <View>
          <ActionButton
            onPress={onThemeChange}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Light /> : <Moon />}
          </ActionButton>
        </View>
      </Flex>

      <Well>
        <Form onSubmit={convertToRomanNumeral}>
          <Flex className="form-container">
            <Flex className="input-row">
              <View flex="1">
                <TextField
                  label="Enter a number"
                  type="number"
                  value={inputValue}
                  onChange={setInputValue}
                  width="100%"
                  validationState={error ? 'invalid' : undefined}
                  errorMessage={error}
                  description="Enter a number between 1 and 3999"
                />
              </View>
              <View marginStart="size-400">
                <Button
                  variant="primary"
                  type="submit"
                  isDisabled={loading}
                  width="100%"
                  height="100%"
                  UNSAFE_style={{
                    backgroundColor: 'var(--spectrum-global-color-gray-700)', // Darker background color
                    color: 'var(--spectrum-global-color-gray-50)', // Lighter text color
                  }}
                >
                  Convert to Roman numeral
                </Button>
              </View>
            </Flex>
          </Flex>
        </Form>

        {loading && (
          <StatusLight variant="info" className="loading-indicator">Converting...</StatusLight>
        )}

        {result && (
          <>
            <View marginY="size-300">
              <Divider size="S" className="result-divider" />
            </View>
            <Flex direction="column" className="result-content" gap="size-200">
              <Text>Result:</Text>
              <Well 
                UNSAFE_className="result-well" 
                padding="size-100" 
                width="100%"
                UNSAFE_style={{
                  backgroundColor: 'var(--spectrum-global-color-gray-200)', // Slightly darker background color
                }}
              >
                <Heading level={3} marginY="size-100">
                  {result}
                </Heading>
              </Well>
            </Flex>
          </>
        )}
      </Well>
    </View>
  );
};

export default RomanNumeralComponent;