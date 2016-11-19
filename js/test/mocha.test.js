const assert = require('assert');

describe('The Mocha test framework', () => {
  it('should return correctly for basic asserts', () => {
    const expectedValue = 'Hello world';
    assert.equal('Hello ' + 'world', expectedValue);
  });
});
