# volto-widget-temporal-coverage

[![Releases](https://img.shields.io/github/v/release/eea/volto-widget-temporal-coverage)](https://github.com/eea/volto-widget-temporal-coverage/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-widget-temporal-coverage%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-widget-temporal-coverage/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-widget-temporal-coverage%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-widget-temporal-coverage/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage-develop)

[Volto](https://github.com/plone/volto) Widget: Temporal Coverage

## Features

![Widget Temporal coverage](https://raw.githubusercontent.com/eea/volto-widget-temporal-coverage/master/docs/volto-widget-temporal-coverage.gif)

## Getting started

### Try volto-widget-temporal-coverage with Docker

      git clone https://github.com/eea/volto-widget-temporal-coverage.git
      cd volto-widget-temporal-coverage
      make
      make start

Go to http://localhost:3000

### Add volto-widget-temporal-coverage to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-widget-temporal-coverage"
   ],

   "dependencies": {
       "@eeacms/volto-widget-temporal-coverage": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-widget-temporal-coverage
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-widget-temporal-coverage/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-widget-temporal-coverage/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-widget-temporal-coverage/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
