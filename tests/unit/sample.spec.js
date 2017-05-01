/* global describe, it, expect */

/**
 * I usually use unit tests to test library implementations
 */

describe('Basic unit tests', () => {
  it('should be true', (done) => {
    expect(true).toBe(true)
    done()
  })

  it('should handle a promise', async (done) => {
    const p = new Promise((resolve) => {
      resolve(true)
    })

    try {
      expect(await p).toBe(true)
      done()
    } catch (e) {
      console.error(e)
      done.fail()
    }
  })
})
