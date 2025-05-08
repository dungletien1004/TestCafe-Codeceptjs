const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    TestCafe: {
      browser: 'chrome',
      show: true,
      disableProxy: true,                 // ✅ tương đương --disable-proxy
      disableNativeAutomation: true,     // ✅ tương đương --disable-native-automation
      screenshotOnFail: true             // tương đương -s takeOnFails=true
    },
    CustomHelper: {
      require: './helpers/CustomHelper.js'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'CodeceptJS'
};
