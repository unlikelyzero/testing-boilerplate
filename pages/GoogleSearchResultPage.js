/* global browser */

import {
  loadUrl,
  getElementBySelector
} from '../lib/protractor-utils'

import {
  GOOGLE_HOMEPAGE_ROOT
} from '../types/google-types'

export default class GoogleSearchResultPage {
  static selectors = {
    SEARCH_INPUT: 'input#lst-ib'
  }

  /**
   * Navigates to the search results with a given query
   * @param {string} query search text
   * @returns {Promise.<void>}
   */
  async navigate (query) {
    // Navigates to https://www.google.com/#q=<query>
    return loadUrl(`${browser.baseUrl}${GOOGLE_HOMEPAGE_ROOT}#q=${encodeURIComponent(query)}`, checkPageLoaded, { timeout: 30000 })
  }

  /**
   * Returns the search result href for a given url
   * @param {String} url
   * @returns {Promise.<webdriver.WebElement>}
   */
  async getSearchResultByUrl (href) {
    return getElementBySelector(`a[href="${href}"]`)
  }
}

async function checkPageLoaded () {
  const sel = GoogleSearchResultPage.selectors.SEARCH_INPUT
  await getElementBySelector(sel, { timeout: 30000 })
  return true
}
