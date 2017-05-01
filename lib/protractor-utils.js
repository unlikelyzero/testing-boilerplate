/* global element, by, browser, protractor */

/**
 * The following are utility functions for ProtractorJS to make your life easier.
 * The largest pain point with using Selenium in Javascript is how to wait for elements
 * on the page to appear. These functions hope to eliminate the need to perform explicit
 * pauses (which is an anti-pattern).
 */

/**
 * With a given CSS selector, wait for the element to be available then return it.
 * @param {String} selector CSS selector (eg. #id, .some-name, etc)
 * @param {Object} [options]
 * @param {number} [options.timeout] Wait timeout in seconds. Default is 5 seconds.
 * @returns {Promise.<webdriver.WebElement>}
 */
export async function getElementBySelector (selector, { timeout } = { timeout: 5000 }) {
  const EC = protractor.ExpectedConditions

  const ele = await element(by.css(selector))
  await browser.driver.wait(EC.presenceOf(ele), timeout)

  return ele
}

/**
 * Gets an array of elements via a CSS selector. Waits for all elements to be available then returns it.
 * @param {String} selector CSS selector (eg. #id, .some-name, etc)
 * @param {Object} [options]
 * @param {number} [options.timeout] Wait timeout in seconds. Default is 5 seconds.
 * @returns {Promise.<Array<webdriver.WebElement>>}
 */
export async function getElementsBySelector (selector, { timeout } = { timeout: 5000 }) {
  const ele = element.all(by.css(selector))

  await browser.driver.wait(presenceOfAll(ele), timeout)

  // The ele object gets mutated to an array at this point from an elementArrayFinder
  // yeah, odd behavior...
  return ele
}

/**
 * Waits for a URL to load then continues
 * @param {String} newUrl URL to load
 * @param {Function} pageLoadCheckFn a function that returns a promise that fulfills when the page has been loaded
 * as defined by the function
 * @param {Object} [options]
 * @param {number} [options.timeout] Wait timeout in seconds. Default is 5 seconds.
 * @returns {Promise.<void>} Resolves when the pageLoadCheckFn fulfills
 */
export async function loadUrl (newUrl, pageLoadCheckFn, { timeout } = { timeout: 5000 }) {
  await browser.driver.get(newUrl)

  return browser.driver.wait(() => {
    return pageLoadCheckFn()
  }, timeout)
}

/**
 * Call this when doing a URL transition. Resolves when the address bar has the new URL.
 * @param {String} newUrl URL to wait for
 * @param {Object} [options]
 * @param {number} [options.timeout] Wait timeout in seconds. Default is 5 seconds.
 * @returns {Promise.<void>} Resolves when the address bar URL matches newUrl
 */
export async function waitForUrlChange (newUrl, { timeout } = { timeout: 5000 }) {
  const EC = protractor.ExpectedConditions
  return browser.driver.wait(EC.urlContains(newUrl), timeout)
}

// https://github.com/molot1989/protractor-expected-conditions-for-all-elements/blob/master/index.js
function presenceOfAll (elementArrayFinder) {
  return async () => {
    const count = await elementArrayFinder.count()
    return count > 0
  }
}

/**
 * Changes focus of the selenium driver to an iframe
 * @param {ElementFinder} element
 * @returns {TargetLocator}
 */
export function switchToIFrame (element) {
  return browser.driver.switchTo().frame(element.getWebElement())
}

/**
 * Switches the focus back to the main browser window
 * @returns {TargetLocator}
 */
export function switchToApp () {
  return browser.driver.switchTo().defaultContent()
}
