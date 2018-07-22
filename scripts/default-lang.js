// See https://github.com/zeit/next.js/tree/canary/examples/with-react-intl
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const glob = require('glob')

const defaultMessages = glob
  .sync('./lang/.messages/**/*.json')
  .map((filename) => readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .reduce((messages, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (messages.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`)
      }
      messages[id] = defaultMessage
    })
    return messages
  }, {})

writeFileSync('./lang/en.json', JSON.stringify(defaultMessages, null, 2))

// tslint:disable-next-line:no-console
console.log(`> Wrote default messages to: "${resolve('./lang/en.json')}"`)
