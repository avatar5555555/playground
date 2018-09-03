<div align="center">
  <h1>Playground</h1>
</div>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Stack

- [React](https://facebook.github.io/react) rendering
- [GraphQL](http://graphql.org) API query language
- [Apollo](http://dev.apollodata.com) GraphQL client
- [GraphQL Yoga](https://www.graph.cool) GraphQL Server
- [Next.js](https://zeit.co/blog/next) universal webapp framework (server-side rendering)
- [React-intl](https://github.com/yahoo/react-intl) for internationalization
- [React Final Form](https://github.com/final-form/react-final-form) for forms
- [Yup](https://github.com/jquense/yup) for validation
- [Styled Components](https://github.com/styled-components/styled-components) CSS in JS
- [Smooth-UI](https://github.com/smooth-code/smooth-ui) React Components library based on Styled Components

Development:

- [asdf](https://github.com/asdf-vm/asdf) to manage node.js version
- [Webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to visualize the bundled code contents

## Development

- `git clone https://github.com/gilaz/playground`

bootstrap

- `npm install` - install lerna dependencies
- `npm run bootstrap` - install packages dependencies, link packages

`npm` will create `.env` for you (through the `postinstall` hook).

start

- `npm run dev` - start server and web

- navigate to <http://localhost:3000>

## WEB NPM Scripts

- `npm run dev` - start client dev server
- `npm run build` - build production build
- `npm run i18n:extract` - extract default translation file
- `npm run start` - start production server
- `npm run export` - extract static version of the project
- `npm run analyze` - run webpack-bundle-analyzer
- `npm run schema:download` - download server graphql schema
- `npm run codegen` - generate typescript typings based on used queries and schema

## TODO

- [x] authentication and authorization
- [ ] video recording
- [ ] chat
- [ ] Greenkeeper
- [ ] ts -> js
- [ ] Docker
- [ ] CI
- [ ] AWS branch
- [ ] ...
