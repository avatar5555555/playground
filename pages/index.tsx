import Head from 'next/head'
import React, { Component, Fragment } from 'react'
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  InjectedIntlProps
} from 'react-intl'
import { Typography } from 'smooth-ui'

import { page } from '~/hocs'

const { description } = defineMessages({
  description: {
    defaultMessage: 'An example app integrating React Intl with Next.js',
    id: 'description'
  }
})

class Index extends Component<InjectedIntlProps> {
  public render() {
    const { intl } = this.props

    return (
      <Fragment>
        <Head>
          <meta
            key="description"
            name="description"
            content={intl.formatMessage(description)}
          />
        </Head>

        <Typography variant="h1">
          <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
        </Typography>

        <Typography>
          <FormattedNumber value={9999} />
        </Typography>
      </Fragment>
    )
  }
}

export default page(Index)
