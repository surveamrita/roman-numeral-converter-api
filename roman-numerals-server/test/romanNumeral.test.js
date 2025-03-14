const request = require('supertest');
const express = require('express');
const romanNumeralRouter = require('../routes/romanNumeral');

const app = express();
app.use('/romannumeral', romanNumeralRouter);

describe('Roman Numeral Conversion API', () => {
    // Test 1: Valid conversion of a single-digit number
    test('converts 1 to I', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '1' });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            input: '1',
            output: 'I'
        });
    });

    // Test 2: Valid conversion of a larger number
    test('converts 3999 to MMMCMXCIX', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '3999' });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            input: '3999',
            output: 'MMMCMXCIX'
        });
    });

    // Test 3: Missing query parameter
    test('returns 400 when query parameter is missing', async () => {
        const response = await request(app)
            .get('/romannumeral');
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing query parameter');
    });

    // Test 4: Invalid number (non-numeric input)
    test('returns 400 for non-numeric input', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: 'abc' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Query must be a valid number');
    });

    // Test 5: Number out of range (too high)
    test('returns 400 for number above 3999', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '4000' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be between 1 and 3999');
    });

    // Test 6: Number out of range (too low)
    test('returns 400 for number below 1', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '0' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be between 1 and 3999');
    });

    // Test 7: Test decimal input
    test('returns 400 for decimal input', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '1.5' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Query must be a whole number');
    });

    // Test 8: Test empty string input
    test('returns 400 for empty string input', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing query parameter');
    });

    // Test 9: Test negative number input
    test('returns 400 for negative number input', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '-1' });
        
        expect(response.status).toBe(400);
        expect(response.text).toBe('Number must be between 1 and 3999');
    });;

    // Test 10: Test multiple subtractive cases, 900 + 90 + 9 = CM XC IX
    test('converts 999 to CMXCIX', async () => {
        const response = await request(app)
            .get('/romannumeral')
            .query({ query: '999' });
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            input: '999',
            output: 'CMXCIX'
        });
    });
}); 