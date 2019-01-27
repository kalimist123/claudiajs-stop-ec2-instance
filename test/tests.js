var expect = require('chai').expect;
var ShutdownTag = require('../shutdownTag.js');

describe('isValid()', function() {
  it('should return true with a valid tag', function() {
    // 1. ARRANGE

    var tag = 'GMT-14';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValid();

    // 3. ASSERT
    expect(result).to.be.true;
  });
});

describe('isValid()', function() {
  it('should return false with a invalid tag', function() {
    // 1. ARRANGE

    var tag = 'GMT-79';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValid();

    // 3. ASSERT
    expect(result).to.be.false;
  });
});

describe('isValidTagHour()', function() {
  it('should return true with a valid hour', function() {
    // 1. ARRANGE

    var tag = 'GMT-24';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValidHour(
      shutdownTag.splitShutDownTagParts(tag)[1]
    );

    // 3. ASSERT
    expect(result).to.be.true;
  });
});

describe('isValidTagHour()', function() {
  it('should return false with an invalid hour', function() {
    // 1. ARRANGE

    var tag = 'GMT-25';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValidHour(
      shutdownTag.splitShutDownTagParts(tag)[1]
    );

    // 3. ASSERT
    expect(result).to.be.false;
  });
});

describe('isValidZone()', function() {
  it('should return false with an invalid tag', function() {
    // 1. ARRANGE

    var tag = 'PPP-25';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValidZone(
      shutdownTag.splitShutDownTagParts(tag)[0]
    );

    // 3. ASSERT
    expect(result).to.be.false;
  });
});

describe('isValidZone()', function() {
  it('should return true with an valid tag', function() {
    // 1. ARRANGE

    var tag = 'GMT-24';
    var shutdownTag = new ShutdownTag(tag);
    // 2. ACT
    var result = shutdownTag.isValidZone(
      shutdownTag.splitShutDownTagParts(tag)[0]
    );

    // 3. ASSERT
    expect(result).to.be.true;
  });
});
