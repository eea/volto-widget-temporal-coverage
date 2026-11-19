# @eeacms/volto-widget-temporal-coverage

[![Releases](https://img.shields.io/github/v/release/eea/volto-widget-temporal-coverage)](https://github.com/eea/volto-widget-temporal-coverage/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-widget-temporal-coverage%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-widget-temporal-coverage/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-widget-temporal-coverage&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-widget-temporal-coverage)

[Volto](https://github.com/plone/volto) Widget: Temporal Coverage

## Features

![Widget Temporal coverage](https://raw.githubusercontent.com/eea/volto-widget-temporal-coverage/master/docs/volto-widget-temporal-coverage.gif)

## Upgrade

### Upgrading to 8.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The widget, its view and the `time_coverage` facet keep the same ids and the same payload, so upgrading from 7.x on Volto 18 needs no content changes. The release adds Volto 19 support and moves the repository to the Volto 19 layout, where the published package lives in `packages/volto-widget-temporal-coverage`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 7.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 7.x declared no peers.
- **The package no longer ships the Jest setup.** `jest-addon.config.js` and `jest.setup.js` were removed in favour of Vitest, so a Volto 18 project that still runs the Jest harness has to keep its own copy.

The package now declares `lodash.debounce`, which the facet imports; 7.x relied on it being hoisted from the project.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-widget-temporal-coverage": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-widget-temporal-coverage'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
