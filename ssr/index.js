const express = require('express')
const next = require('next')

require('dotenv').config()

const createLocaleMiddleware = require('./localeMiddleware')

const { NODE_ENV = 'development', SSR_SERVER_PORT = 3000 } = process.env

const isDev = NODE_ENV !== 'production'

const app = next({ dev: isDev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(createLocaleMiddleware(isDev))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(SSR_SERVER_PORT, (err) => {
      if (err) {
        throw err
      }

      // tslint:disable-next-line
      console.log(`> Ready on http://localhost:${SSR_SERVER_PORT}`)
    })
  })
  .catch((ex) => {
    // tslint:disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
