/* global browser */

/**
 * This is the configuration file for using protractor (selenium) to test web pages.
 * This file in particular is the entrypoint for transpilation, so we have to use
 * requires() here instead of imports for modules.
 *
 * https://github.com/angular/protractor/blob/master/lib/config.ts
 *
 * Note: the protractor project itself is written in TypeScript, so the syntax will look very different
 * if you choose to inspect how it works.
 */

// This says for all other .js files, we will enable ESx support, including imports
require('babel-core/register')

const baseURL = require('../types/google-types').GOOGLE_HOMEPAGE

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../tests/e2e/**/*.spec.js'],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: baseURL,
  // Disable the use of the selenium-webdriver control flow - we don't need it as we're using
  // async/await to call the API instead
  // for more info - https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/promise.html
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: () => {
    // by default, protractor is built for use with angular.js projects
    // enabling this option allows us to use it in non-angular projects instead
    browser.ignoreSynchronization = true
  }
}
