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
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: () => {
    browser.ignoreSynchronization = true
  }
}
