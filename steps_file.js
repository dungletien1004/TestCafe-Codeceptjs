module.exports = function () {
  return actor({
    logCurrentUrl: () => {
      return this.helpers.CustomHelper.logCurrentUrl();
    },
    clickIfExists: (selector) => {
      return this.helpers.CustomHelper.clickIfExists(selector);
    },
    clickWithRetry: (selector, attempts) => {
      return this.helpers.CustomHelper.clickWithRetry(selector, attempts);
    },
    assertContainsIgnoreCase: (actual, expected) => {
      return this.helpers.CustomHelper.assertContainsIgnoreCase(actual, expected);
    }
  });
};
