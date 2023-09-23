const { getAPIKey, analyzeURLContent, handleSubmit } = require('../src/client/js/formHandler.js');

describe('Testing getAPIKey function', () => {
  test('The function exists', () => {
    expect(getAPIKey).toBeDefined();
  });
});

describe('Testing analyzeURLContent function', () => {
  test('The function exists', () => {
    expect(analyzeURLContent).toBeDefined();
  });
});

describe('Testing handleSubmit function', () => {
  test('The function exists', () => {
    expect(handleSubmit).toBeDefined();
  });
});