'use strict';

class ShutdownTag {
  constructor(_tagValue) {
    this.tagValue = _tagValue;
    this.validZones = ['GMT', 'PST'];
  }

  isShutDownHour() {
    if (this.isValid()) {
      var tagParts = this.tagValue.split('-');
      var tagZone = tagParts[0];
      var tagHour = tagParts[1];

      var d = new Date();
      var timeZoneHour = this.getHourForTimezone(tagZone);
      console.log('tag hour:', tagHour);
      console.log('timeZone Hour', timeZoneHour);
      if (tagHour == timeZoneHour) return true;
      return false;
    }
  }

  isValid() {
    return this.isValidShutdownTag(this.tagValue);
  }

  isValidShutdownTag(tagValue) {
    var tagParts = this.splitShutDownTagParts(tagValue);
    if (!this.isValidShutdownTagStructure(tagParts)) return false;

    if (!this.isValidZone(tagParts[0])) return false;

    if (!this.isValidHour(tagParts[1])) return false;

    return true;
  }

  splitShutDownTagParts(tagValue) {
    return tagValue.split('-');
  }

  isValidShutdownTagStructure(tagParts) {
    if (!Array.isArray(tagParts)) {
      Console.log('tag does not split to array');
      return false;
    }

    if (tagParts.length == !2) {
      Console.log('tag does not split to 2 elements');
      return false;
    }
    return true;
  }

  isValidHour(tagHour) {
    if (tagHour >= 1 && tagHour <= 24) return true;

    console.log('invalid hour tag', tagHour);
    return false;
  }

  isValidZone(tagZone) {
    if (this.validZones.includes(tagZone)) return true;

    console.log('invalid zone tag', tagZone);
    return false;
  }

  getHourForTimezone(tagZone) {
    var date = new Date();
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: tagZone
    });
  }
}

module.exports = ShutdownTag;
