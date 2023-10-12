<h1 align="center">Deriv API</h1>

This repository contains the information and code related to the Deriv API documentation.

![Prerequisite](https://img.shields.io/badge/node-%3E%3D16.16.0-blue.svg)
[![Coverage Status](https://coveralls.io/repos/github/binary-com/deriv-api-docs/badge.svg?branch=master)](https://coveralls.io/github/binary-com/deriv-api-docs?branch=master)

<!--
![CircleCI](https://img.shields.io/circleci/build/github/binary-com/deriv-api-docs)
![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations (short format)](https://img.shields.io/sonar/violations/binary-com_deriv-app?server=https%3A%2F%2Fsonarcloud.io) -->

**In this document**:

- [Other Documents](#other-documents)
- [Pre-installation](#Pre-installation)
- [Quick start](#Quick-start)
- [Packages](#packages)
- [Working With This Repo](#working-with-this-repo)
  - [Package names](#package-names)
  - [Usage](#usage)
    - [Starting a Development Server](#starting-a-dev-server)
    - [Release](#release)
- [PR Guidelines](#pr-guidelines)

## Other documents:

- [General](docs/README.md) - Contains general philosophy and overview of this package

## Pre-installation

Before running or contributing to this project, you need to install the following packages for your environment

- node >=16.16.0
- npm >=7.21.0
- docusaurus >=2.0.0
- @deriv/ui >=0.1.0
- git (for `contribution`)
- docker-cli

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
    npm ci
    ```

5.  **Build the project:**

    ```sh
    npm run build
    ```

6.  **Run the Build**
    Run proxy server in seperate terminal

    ```sh
    npm run start:auth
    ```

    After that, start the application in another terminal

    ```sh
    npm run start
    ```

<br />

### Starting a Development Server

1. Core:

If you wish to work on Core, simply run `npm run start`.

2.  Netlify Proxy + Core :

    1.  To work on cms configs, run:

        ```sh
        npm run start:auth
        ```

    2.  In a separate terminal, this will start the netlify-cms-proxy-server and will enable you to work with the cms locally.
        and then run:

        ```sh
        npm run start
        ```

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
