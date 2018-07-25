import Head from 'next/head'
import React, { Component } from 'react'
import { FormattedMessage, InjectedIntlProps } from 'react-intl'
import { th, Typography } from 'smooth-ui'
import styled from 'styled-components'

import { getCurrentUser, redirect } from 'src/lib'
import { Card, Center } from 'src/ui'

const Root = styled(Center)`
  background-color: ${th('light')};
`

const FormBox = styled(Card)`
  max-width: 400px;
`

export class PageTemplate extends Component<
  InjectedIntlProps & {
    title: FormattedMessage.MessageDescriptor
    children: React.ReactNode
  }
> {
  static async getInitialProps(context) {
    const currentUser = await getCurrentUser(context.apolloClient)

    if (currentUser) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
  }

  render() {
    const { intl, children, title } = this.props

    return (
      <Root>
        <Head>
          <title key="title">{intl.formatMessage(title)}</title>
        </Head>

        <FormBox>
          <Typography variant="h2">
            <FormattedMessage {...title} />
          </Typography>

          {children}
        </FormBox>
      </Root>
    )
  }
}
