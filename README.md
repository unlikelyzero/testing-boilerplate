# testing-boilerplate

Boilerplate for testing that includes proper ESx + lint + jest + protractor support

## Install

Make sure Chrome is installed.

In the project directory, run

`npm install`

## Running tests

### Running automation tests

To run the Protractor tests, start the selenium server in one terminal:

`npm run start-selenium`

And the tests in another terminal:

`npm run e2e`

### Running unit tests

`npm run unit`

### Running both tests

`npm run test`

## Project structure

```
<root>/
├── config/ Configuration files
├── lib/ General-use libs
├── mock/ Mock data
│   ├── data/ Mock data (eg HTTP JSON responses)
│   ├── lib/ Mocked libraries (code that overrides library functions)
├── pages/ Page objects
├── tests/ Tests
│   ├── e2e/ End-to-end / automation tests (uses Protractor / Selenium to run)
│   ├── unit/ Unit / library tests (uses Jest to run)
└── types/ Constants / enums that are used throughout the codebase
```

## Literature

- The Protractor API is used to write automation tests:

http://www.protractortest.org/#/api

- Unit tests use Jest

https://facebook.github.io/jest/

- Tests are written using the Jasmine API

https://jasmine.github.io/2.6/introduction.html

- Javascript ES6 primer

https://github.com/lukehoban/es6features

- Standard JS (Code linter)

https://standardjs.com/
