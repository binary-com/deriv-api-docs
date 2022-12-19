<h1 align="center">Deriv API</h1>

This repository contains the various platforms of the Deriv application.

![CircleCI](https://img.shields.io/circleci/build/github/binary-com/deriv-app) ![Prerequisite](https://img.shields.io/badge/node-%3E%3D16.16.0-blue.svg) ![Prerequisite](https://img.shields.io/badge/npm-%3E%3D7.21.0-blue.svg) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (short format)](https://img.shields.io/sonar/violations/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io)
[![codecov](https://codecov.io/gh/binary-com/deriv-app/branch/dev/graph/badge.svg?token=LClg2rlZ4z)](https://codecov.io/gh/binary-com/deriv-app)

**In this document**:

- [Other Documents](#other-documents)
- [Pre-installation](#Pre-installation)
- [Quick start](#Quick-start)
- [Packages](#packages)
- [Working With This Repo](#working-with-this-repo)
  - [Package names](#package-names)
  - [Usage](#usage)
    - [Starting a Development Server](#starting-a-dev-server)
    - [How to Clean Packages](#how-to-clean-packages)
    - [Examples of Script Usage](#examples-of-script-usage)
    - [Release](#release)
- [PR Guidelines](#pr-guidelines)
- [FAQ](#faq)

## Other documents:

- [General](docs/README.md) - Contains general philosophy and overview of this package
- [Stylesheet guidelines](docs/Stylesheet/README.md) - Contains rules for CSS/SASS code style
- [JavaScript guidelines](docs/JavaScript/README.md) - Contains rules for JS/JSX code style
- [Modules docs](docs/Modules/README.md) - Contains implementation guides (i.e., scaffolding, code usage)
- [e2e and performance testing docs](e2e_tests/README.md) - Contains documents for create and running e2e and performance tests
- [Manage dependencies](docs/Dependencies/README.md)

[comment]: <> (TODO: Refactor Clean Project to be under usage)

## Pre-installation

Before running or contribute to this project, you need to have the setup of the following package in your environment.

- node >=16.16.0
- npm >=7.21.0
- docusaurus >=2.0.0
- linaria >=4.1.2
- git (for `contribution`)

**Note**: `node -v` and `sudo node -v` should be the same version.

## Quick start

1.  **Fork the project**

    In order to work on your own version of the Deriv application, please fork the project to your own repository.

2.  **Clone using SSH**

    ```sh
    git clone git@github.com:binary-com/deriv-api-docs.git
    ```

3.  **Enter project directory**

    ```sh
    cd deriv-api-docs
    ```

4.  **Install your dependencies:**

    ```sh
    npm i
    ```

5.  **Build the project:**

    ```sh
    npm run build
    ```

<br />
### Starting a Development Server

If you wish to work on Core, simply run `npm run start`.

<br />

## How to Contribute

PRs are based on the master branch

1. Create branch from the latest master branch

   ```sh
   git checkout master
   git pull upstream master
   git checkout -b [_your_branch_name]
   ```

2. Make your changes

3. Make pull request

- Push your changes to your origin

  ```sh
  git push -u origin [_your_branch_name]
  ```

## Release

There are 2 types of release:

1. Release to staging:
   1. `git tag staging_v20191205 -m 'release staging'` # the tag needs to follow the RegExp format `/^staging.*/`
   2. `git push origin staging_v20191205`
2. Release to production:
   1. `git tag production_v20191205 -m 'release production'`
   2. `git push origin production_v20191205`

<br />

## Test link deployment

Upon creating PR, [Vercel](https://vercel.com/) will auto-generate a test link inside the PR. you can use that to preview the test link for the changes you have made.

<br />
