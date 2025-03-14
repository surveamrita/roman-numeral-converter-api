const express = require('express');
const router = express.Router();
const romanNumerals = require('../config/integerValueToRomanNumeral.json');

/**
 * Convert an integer to a Roman numeral
 * @param {number} num - The integer to convert
 * @returns {string} The Roman numeral representation of the integer
 * 
 * romanNumerals is an array of {integerValue: number, romanNumeral: string} object in descending order of integerValue
 * 
 * The function iterates through the romanNumerals array and subtracts the integerValue from num until num is less than
 * the integerValue. It then appends the romanNumeral to the result string and returns the result string
 * The time complexity is O(n) where n is the number of elements in the romanNumerals array.
 * The space complexity is O(1) since no extra space is used.
 */
function convertToRoman(num) {
    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].integerValue) {
            result += romanNumerals[i].romanNumeral;
            num -= romanNumerals[i].integerValue;
        }
    }
    return result;
}

/**
 * Roman numeral route
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {string} The Roman numeral representation of the integer
 */
router.get("/", (req, res) => {
    const query = req.query.query;
    
    // Check if query parameter exists
    if (!query ||query === undefined) {
        return res.status(400).send('Missing query parameter');
    }
    
    // Convert query to number and validate
    const num = parseInt(query);
    
    // Check if it's a valid number
    if (isNaN(num)) {
        return res.status(400).send('Query must be a valid number');
    }

    // Check if it contains a decimal point
    if (query.includes('.')) {
        return res.status(400).send('Query must be a whole number');
    }

    // Check range (1-3999)
    if (num < 1 || num > 3999) {
        return res.status(400).send('Number must be between 1 and 3999');
    }

    // Convert to Roman numeral and send response
    const romanNumeral = convertToRoman(num);
    res.json({
        input: query,
        output: romanNumeral
    });
});

module.exports = router; 