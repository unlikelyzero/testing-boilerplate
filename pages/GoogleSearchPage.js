/* global browser, protractor */

/**
 * Represents actions found on the google search page
 */

import {
  loadUrl,
  getElementBySelector,
  waitForUrlChange
} from '../lib/protractor-utils'

import {
  GOOGLE_HOMEPAGE_ROOT
} from '../types/google-types'

export default class GoogleSearchPage {
  /*
  If you need to pass in params when creating an object,
  define a constructor:

  constructor (blah) {
    this.value = blah
  }
  */

  static selectors = {
    SEARCH_INPUT: 'input#lst-ib'
  }

  /**
   * Navigates to the google homepage
   * @returns {Promise.<void>}
   */
  async navigate () {
    // Navigates to https://www.google.com/
    return loadUrl(`${browser.baseUrl}${GOOGLE_HOMEPAGE_ROOT}`, checkHomepageLoaded, { timeout: 30000 })
  }

  /**
   * Gets the search input
   * @returns {Promise<webdriver.WebElement>}
   */
  async getSearchInputEle () {
    // returns a WebElement
    // http://www.protractortest.org/#/api?view=webdriver.WebElement
    return getElementBySelector(GoogleSearchPage.selectors.SEARCH_INPUT)
  }

  /**
   * Sets the search input text
   * @param {String} text Search text
   * @returns Promise<void>
   */
  async setSearchInputText (text) {
    const ele = await this.getSearchInputEle()

    // clear the input
    await ele.clear()
    await ele.sendKeys(text)
  }

  /**
   * Gets the search input text
   * @returns {Promise.<String>}
   */
  async getSearchInputText () {
    const ele = await this.getSearchInputEle()

    // because this is an input type, we need to use getAttribute() instead of getText()
    return ele.getAttribute('value')
  }

  /**
   * Submits the query
   * @returns {Promise.<void>}
   */
  async submitQuery () {
    const ele = await this.getSearchInputEle()

    // make sure we have input focus before we can trigger submit
    await ele.click()

    // Press enter to submit
    // protractor is a global - unfortunately can't seem to find docs on the global specifically
    // http://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.sendKeys
    ele.sendKeys(protractor.Key.ENTER)

    const text = await this.getSearchInputText()

    // wait for the url to change to confirm the submission
    return waitForUrlChange(`${browser.baseUrl}${GOOGLE_HOMEPAGE_ROOT}#q=${encodeURIComponent(text)}`)
  }
}

// A webpage may have been fully loaded, but there might be components
// that we care about that take time to load
// so we have a check function to wait for the element(s) to load
// before we can say the page has actually been loaded
async function checkHomepageLoaded () {
  const sel = GoogleSearchPage.selectors.SEARCH_INPUT
  await getElementBySelector(sel, { timeout: 30000 })
  return true
}
