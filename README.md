# Nightlybuilders React Boilerplate

This boilerplate kick starts your next React based web application. With the
help of awesome technologies you can start your next project right away. Just
clone this repository (yeoman in the making) and start developing your idea.

<!-- TOC -->

## Table of Contents

* [Nightlybuilders React Boilerplate](#nightlybuilders-react-boilerplate)
  * [Features](#features)
  * [Installation](#installation)
  * [How to develop and contribute](#how-to-develop-and-contribute)
  * [More Examples](#more-examples)
  * [Licence](#licence)
  * [Maintainers](#maintainers)
  * [Changelog](CHANGES.md)

<!-- /TOC -->

## Features

[![GitHub stars](https://img.shields.io/github/stars/nightlybuilders/nightlybuilders-react-boilerplate.svg)](https://github.com/nightlybuilders/nightlybuilders-react-boilerplate/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/nightlybuilders/nightlybuilders-react-boilerplate.svg)](https://github.com/nightlybuilders/nightlybuilders-react-boilerplate/network)
[![GitHub issues](https://img.shields.io/github/issues/nightlybuilders/nightlybuilders-react-boilerplate.svg)](https://github.com/nightlybuilders/nightlybuilders-react-boilerplate/issues)

This boilerplate provides a varity of out-of-the-box features for both development
and production:

* :tada: React boilerplate app with server-side rendering, data prefetching and more
* :twisted_rightwards_arrows: Easy state management with [Redux](https://redux.js.org/)
* :boom: GQL support with [Apollo](https://www.apollographql.com/docs/react/)
  integration for both server and client
* :rocket: Webpack, Storybook, ESLint, Stylelint and Prettier and lots of other
  awesome technologies used for development and production builds

## Installation

### Requirements

* yarn 1.9.4 or higher
* node 8.11.1 or higher
* npm 5.6 or higher

### Usage

```
git clone git@github.com:nightlybuilders/nightlybuilders-react-boilerplate.git
cd nightlybuilders-react-boilerplate
yarn // also works with npm i
yarn start // also works with npm start
```

## How to develop and contribute

### Contribution

We'll soon describe how you can contribute here.

### List of scripts and git hooks

The following scripts are available (works with `npm run` too):

* `yarn build`: bundles the production build
* `yarn build:analyse`: bundles the production build and analyses the result with [Jarvis](https://github.com/zouhir/jarvis).
* `yarn build:dev`: bundles the development build
* `yarn build:storybook`: bundles and creates a staic build of storybook stories
* `yarn lint`: lints the js-code with Eslint (without `--fix`)
* `yarn lint:scss`: lints the scss-code with Stylelint (without `--fix`)
* `yarn start`: builds the app and starts the node server
* `yarn storybook`: starts the storybook (available on http://localhost:9001)
* `yarn test`: runs tests with jest
* `yarn test:coverage`: runs tests with jest and creates a coverage report
* `yarn watch:test`: runs tests with jest in watch mode
* `yarn watch:client`: builds the app with webpack in wach mode
* `yarn watch:server`: starts the node server in watch mode with nodemon

#### Pre-Commit Hooks

When attempting to commit and push changes, some taks will automatically run:

* **JavaScript files (.js):**

  * runs `eslint --fix` and formats the code
  * runs all related tests of the committed files with `jest`

* **Scss files (.scss):**
  * runs `stylelint --fix` and formats the code

#### Pre-Push Hooks

Runs all tests with Jest.

### Debug Mode

To enable logging in your browser (or on the server), one have to start the debug
mode by running `localStorage.setItem('debug', '\*')` in your browser's console,
or setting `DEBUG=*` in ´.env`.

## More Examples

Tell us more about your project based on our boilerplate and we can list it here.

## LICENCE

[Apache License 2.0](LICENCE)

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/lumannnn">
          <img width="150" height="150" src="https://github.com/lumannnn.png?v=3&s=150">
          </br>
          Lukas Ender
        </a>
        <div>
          <a href="https://twitter.com/lukasender">
            <img src="https://img.shields.io/twitter/follow/lukasender.svg?style=social&label=Follow" />
          </a>
        </div>
      </td>
      <td align="center">
        <a href="https://github.com/natterstefan">
          <img width="150" height="150" src="https://github.com/natterstefan.png?v=3&s=150">
          </br>
          Stefan Natter
        </a>
        <div>
          <a href="https://twitter.com/natterstefan">
            <img src="https://img.shields.io/twitter/follow/natterstefan.svg?style=social&label=Follow" />
          </a>
        </div>
      </td>
    </tr>
  <tbody>
</table>
