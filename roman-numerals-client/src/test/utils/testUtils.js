import React from 'react';
import { render } from '@testing-library/react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';

export const renderWithSpectrum = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <Provider theme={defaultTheme}>
      {children}
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export const mockFetchResponse = (data, ok = true) => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data))
    })
  );
}; 