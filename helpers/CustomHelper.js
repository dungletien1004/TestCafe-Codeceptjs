const Helper = require('@codeceptjs/helper');

class CustomHelper extends Helper {
  /**
   * Ghi log URL hiện tại — dùng để debug hoặc xác minh điều hướng.
   */
  async logCurrentUrl() {
    const helper = this.helpers.TestCafe;
    const ClientFunction = helper.ClientFunction;
    const getUrl = ClientFunction(() => window.location.href);
    const url = await getUrl();
    console.log('🌐 Current URL:', url);
  }

  /**
   * Click vào element nếu nó hiện diện và visible
   * @param {string} selector - CSS hoặc XPath selector
   */
  async clickIfExists(selector) {
    const I = this.helpers.TestCafe;
    const count = await I.grabNumberOfVisibleElements(selector);
    if (count > 0) {
      I.say(`✅ Clicking visible element: ${selector}`);
      I.click(selector);
    } else {
      I.say(`⚠️ Element not found or not visible: ${selector}`);
    }
  }

  /**
   * Click với retry nếu selector load chậm
   * @param {string} selector
   * @param {number} attempts
   */
  async clickWithRetry(selector, attempts = 3) {
    const I = this.helpers.TestCafe;
    for (let i = 0; i < attempts; i++) {
      const count = await I.grabNumberOfVisibleElements(selector);
      if (count > 0) {
        I.say(`✅ Clicked after ${i + 1} attempt(s)`);
        I.click(selector);
        return;
      }
      I.say(`🔄 Retry ${i + 1}/${attempts}: element not visible yet`);
      I.wait(1);
    }
    throw new Error(`❌ Failed to click: ${selector} after ${attempts} retries`);
  }

  /**
   * So sánh text không phân biệt hoa thường
   * @param {string} actual
   * @param {string} expected
   */
  assertContainsIgnoreCase(actual, expected) {
    if (!actual.toLowerCase().includes(expected.toLowerCase())) {
      throw new Error(`❌ Text "${actual}" does not contain "${expected}" (case-insensitive)`);
    } else {
      console.log(`✅ Text matched (ignore case): "${actual}" includes "${expected}"`);
    }
  }
}

module.exports = CustomHelper;
