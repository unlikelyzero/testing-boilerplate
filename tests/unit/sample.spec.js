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
      expect(await p, 'the promise is true').toBe(true)
      done()
    } catch (e) {
      console.error(e)
      done.fail()
    }
  })
  
  it('should test an object', (done) => {
    const obj = {
     'test': 123 
    }

    expect(obj.test, 'test the test property exists').toBeDefined()
    expect({ 'test': 123 }, 'test object equality').toEqual(obj)
    done()
  })
})
