import Head from 'next/head'
import React, { Component, Fragment } from 'react'
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  InjectedIntlProps
} from 'react-intl'
import { Box, Typography } from 'smooth-ui'
import styled from 'styled-components'

import { getCurrentUser, redirect } from 'src/lib'

const { description, title } = defineMessages({
  description: {
    defaultMessage: 'An example app integrating React Intl with Next.js',
    id: 'dashboard.description'
  },
  title: {
    defaultMessage: 'My playground',
    id: 'dashboard.title'
  }
})

const Root = styled(Box)`
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
`

export class Dashboard extends Component<InjectedIntlProps> {
  static async getInitialProps(context) {
    const currentUser = await getCurrentUser(context.apolloClient)

    if (!currentUser) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/login')
    }

    return { currentUser }
  }

  render() {
    const { intl } = this.props

    return (
      <Fragment>
        <Head>
          <meta
            key="description"
            name="description"
            content={intl.formatMessage(description)}
          />

          <title>{intl.formatMessage(title)}</title>
        </Head>

        <Root>
          <Typography variant="h1">
            <FormattedMessage
              id="dashboard.greeting"
              defaultMessage="Hello, World!"
            />
          </Typography>

          <Typography variant="h2">
            <FormattedNumber value={9999} />
          </Typography>

          <Typography variant="h3">
            <FormattedMessage id="dashboard.videos" defaultMessage="Videos" />
          </Typography>
        </Root>
      </Fragment>
    )
  }
}
