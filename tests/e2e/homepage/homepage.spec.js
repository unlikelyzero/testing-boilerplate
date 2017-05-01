/* global describe, it, expect, beforeEach */

/**
 * Automation tests for the google homepage
 *
 * - Tests should ideally be executable as individual units.
 * If I was to disable all tests but one, that single test should
 * be able to execute fully without depending on prior tests.
 *
 * - Selenium commands should be minimized and defined in page objects where possible
 *
 * Protractor uses the Jasmine test framework under the hood.
 *
 * https://jasmine.github.io/2.6/introduction.html
 */

import {
  handleErr
} from '../../../lib/utils'

import GoogleSearchPage from '../../../pages/GoogleSearchPage'
import GoogleSearchResultPage from '../../../pages/GoogleSearchResultPage'

const TEST_STR = 'test'

/**
 * Adding type hinting here for better autocompletion in the webstorm IDE
 * @type {GoogleSearchPage}
 */
let searchPage = null

// executes the following before the execution of each unit
beforeEach(async (done) => {
  try {
    // make the search page object available
    searchPage = new GoogleSearchPage()

    // navigate to the google search page
    await searchPage.navigate()
    done()
  } catch (e) {
    handleErr(e)
    done.fail()
  }
})

describe('Google search page', () => {
  it('should set the input text', async (done) => {
    try {
      await searchPage.setSearchInputText(TEST_STR)

      expect(await searchPage.getSearchInputText()).toBe(TEST_STR)
      done()
    } catch (e) {
      handleErr(e)
      done.fail()
    }
  })

  it('should set the input text and submit the query', async (done) => {
    const searchResultPage = new GoogleSearchResultPage()

    try {
      await searchPage.setSearchInputText(TEST_STR)

      // Submit the query and wait for the url to transition
      await searchPage.submitQuery()

      // Check that there is the test wiki entry as a result
      const resultHrefEle = await searchResultPage.getSearchResultByUrl('https://en.wikipedia.org/wiki/Test')
      expect(resultHrefEle.getText()).toBe('Test - Wikipedia')
      done()
    } catch (e) {
      handleErr(e)
      done.fail()
    }
  })
})
