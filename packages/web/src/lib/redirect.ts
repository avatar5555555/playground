import { NextContext } from 'next'
import Router from 'next/router'

export const redirect = (context: NextContext, target: string): void => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}
