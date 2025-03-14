import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithSpectrum, mockFetchResponse } from '../../utils/testUtils';
import RomanNumeralComponent from '../../../pages/home/RomanNumeralComponent';

describe('RomanNumeralComponent', () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    fetch.mockClear();
  });

  it('renders the input field and convert button', () => {
    renderWithSpectrum(<RomanNumeralComponent />);
    
    expect(screen.getByLabelText(/enter a number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
  });

  it('converts number to Roman numeral successfully', async () => {
    // Mock a successful response for the number conversion
    mockFetchResponse({ input: "42", output: "XLII" });
    
    renderWithSpectrum(<RomanNumeralComponent />);

    const input = screen.getByLabelText(/enter a number/i);
    fireEvent.change(input, { target: { value: '42' } }); // Simulate entering a number
    
    const button = screen.getByRole('button', { name: /convert/i });
    fireEvent.click(button); // Simulate clicking the convert button

    // Wait for the result to appear in the document
    await waitFor(() => {
      expect(screen.getByText('XLII')).toBeInTheDocument();
    });
  });

  it('shows loading state while converting', async () => {
    // Mock a successful response for the number conversion
    mockFetchResponse({ input: "42", output: "XLII" });
    
    renderWithSpectrum(<RomanNumeralComponent />);

    const input = screen.getByLabelText(/enter a number/i);
    fireEvent.change(input, { target: { value: '42' } });
    
    const button = screen.getByRole('button', { name: /convert/i });
    fireEvent.click(button);

    // Check if the loading state is displayed
    expect(screen.getByText(/converting/i)).toBeInTheDocument();

    // Wait for the loading indicator to be removed
    await waitFor(() => {
      expect(screen.queryByText(/converting/i)).not.toBeInTheDocument();
    });
  });
});