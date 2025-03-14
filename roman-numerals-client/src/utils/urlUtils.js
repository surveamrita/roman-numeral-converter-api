import urls from '../config/urls.json';

/**
 * Formats a URL template with provided parameters
 * @param {string} template - URL template with {param} placeholders
 * @param {Object} params - Key-value pairs of parameters to replace
 * @returns {string} Formatted URL
 */
export const formatUrl = (template, params = {}) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
};

/**
 * Gets a formatted API URL by path
 * @param {string} path - Dot notation path to the URL in urls.json (e.g., 'api.romanNumeral.convert')
 * @param {Object} params - Parameters to replace in the URL template
 * @returns {string} Formatted URL
 */
export const getApiUrl = (path, params = {}) => {
  const urlTemplate = path.split('.').reduce((obj, key) => obj[key], urls);
  return formatUrl(urlTemplate, params);
}; 