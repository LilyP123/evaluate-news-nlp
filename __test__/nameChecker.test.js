const { checkForName } = require('../src/client/js/nameChecker.js');

describe('Testing checkForName function', () => {
  test('The function exists', () => {
    expect(checkForName).toBeDefined();
  });
});
