# volto-widget-temporal-coverage
[![Releases](https://img.shields.io/github/v/release/eea/volto-widget-temporal-coverage)](https://github.com/eea/volto-widget-temporal-coverage/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-widget-temporal-coverage%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-widget-temporal-coverage/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-widget-temporal-coverage%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-widget-temporal-coverage/job/develop/display/redirect)

[Volto](https://github.com/plone/volto) Widget: Temporal Coverage

## Features

![Widget Temporal coverage](https://github.com/eea/volto-widget-temporal-coverage/raw/docs/docs/volto-widget-temporal-coverage.gif)


## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-widget-temporal-coverage

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-widget-temporal-coverage
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-widget-temporal-coverage"
   ],

   "dependencies": {
       "@eeacms/volto-widget-temporal-coverage": "^1.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-widget-temporal-coverage/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-widget-temporal-coverage/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
