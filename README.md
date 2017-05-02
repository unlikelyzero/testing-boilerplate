# testing-boilerplate

Fully-documented boilerplate for testing that includes proper ESx + lint + jest + protractor support using page objects implemented via ES6 `class`.

The automation example tests the Google search page and results.

- Uses `async/await` instead of explicit `Promise` and disables the selenium webdriver's custom promise control-flow; actions and tests that use or return `Promise` should be super simple to read.
- [ProtractorJS](http://www.protractortest.org) for automation tests.
- [Jest](https://facebook.github.io/jest/) for unit tests.
- ES6 + ESx features are enabled via `babel`.
- [StandardJS](https://standardjs.com/) for code linting.

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

## Troubleshooting

*Can't start the automation tests. I get something like*

```
[16:51:41] I/launcher - Running 1 instances of WebDriver
[16:51:41] I/hosted - Using the selenium server at http://localhost:4444/wd/hub
[16:51:41] E/runner - Unable to start a WebDriver session.
(node:22122) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: ECONNREFUSED connect ECONNREFUSED 127.0.0.1:4444
[16:51:41] E/launcher - Error: Error: ECONNREFUSED connect ECONNREFUSED 127.0.0.1:4444
    at ClientRequest.<anonymous> (/Volumes/sixfive-cs/node-qa-boilerplate/node_modules/selenium-webdriver/http/index.js:238:15)
    at emitOne (events.js:96:13)
```

Make sure the selenium server is running in a separate terminal via `npm run start-selenium`.

*I need to mock a function*

Look at the Jasmine [spy](https://jasmine.github.io/2.6/introduction.html#section-Spies) methods.

*I need to mock network requests*

I recommend using [nock](https://github.com/node-nock/nock).

*The Jest structure isn't correct. What happened to the `__tests__` directory?*

This is just a sample that's trying to consolidate everything into one area. Ideally, your unit tests should be in the
`__tests__` subdir, but if you're starting out here, just stick to the project structure I've defined.

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

- The Protractor API:

http://www.protractortest.org/#/api

- Tests are written using the Jasmine API

https://jasmine.github.io/2.6/introduction.html

- Javascript ES6 primer

https://github.com/lukehoban/es6features

- Page objects

https://github.com/angular/protractor/blob/master/docs/page-objects.md

- An overview of Javascript testing in 2017

https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a
