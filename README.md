<div align="center">
  <h1>Playground</h1>
</div>

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

- [Webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to visualize the bundled code contents

## Development

- `git clone https://github.com/gilaz/playground && cd playground/server`

server

- `npm install` - install server dependencies
- `npm start` - start the server

client

- `cd ..` - navigate back to root
- `npm install` - install client dependencies
- `npm run dev` - start client size

- navigate to <http://localhost:3000>

`npm` will create `.env` for you (through the `postinstall` hook).


## NPM Scripts

- `npm run dev` - start client dev server
- `npm run build` - build production build
- `npm run i18n:extract` - extract default translation file
- `npm run start` - start production server
- `npm run export` - extract static version of the project
- `npm run analyze` - run webpack-bundle-analyzer
- `npm run schema:download` - download server graphql schema
- `npm run codegen` - generate typescript typings based on used queries and schema

## Features

- [x] authentication and authorization
- [ ] video recording
- [ ] chat
