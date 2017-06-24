# react-boilerplate [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Another [React](https://facebook.github.io/react/) boilerplate.

## Features

- [x] [Webpack 2](https://webpack.js.org/).
- [x] [React](https://facebook.github.io/react/) `v15.6` with [React Hot Loader 3](https://github.com/gaearon/react-hot-loader).
- [x] [CSS Modules](https://github.com/gajus/babel-plugin-react-css-modules) with [Sass](https://github.com/jtangelder/sass-loader) support.
- [x] [ESLint](http://eslint.org/) with [Standard](http://standardjs.com/).
- [x] [PostCSS](https://github.com/postcss/postcss-loader) with [Autoprefixer](https://github.com/postcss/autoprefixer).
- [x] [Webpack Code Spliting](https://webpack.js.org/guides/code-splitting/).
- [x] [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard) for development.
- [x] [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) for production.
- [ ] Pre-rendering and server-side rendering hydration.
- [ ] Service Workers for offline caching powered by sw-precache.
- [ ] Testing.

[Node 6](https://nodejs.org/en/) or later is required.

## Install

Clone the repository and install dependencies:

```sh
git clone \
  --depth 1 \
  --single-branch \
  --branch latest \
  https://github.com/joseluisq/react-boilerplate.git ./my-react-stuff
```
_Replace `--branch` value with `latest` release tag (E.g. `latest`, `v0.1.0`, etc)_

```sh
cd ./my-react-stuff

yarn
```

## Development

```sh
yarn start
```

## Production

```sh
yarn build
```

## Contributions

[Pull requests](https://github.com/joseluisq/react-minimal-boilerplate/pulls) and [issues](https://github.com/joseluisq/react-minimal-boilerplate/issues) are very appreciated.

## License
MIT license

© 2017 [José Luis Quintana](http://git.io/joseluisq)
