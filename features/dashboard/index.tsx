import { gql } from 'apollo-boost'
import Head from 'next/head'
import Link from 'next/link'
import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import {
  defineMessages,
  FormattedMessage,
  FormattedNumber,
  InjectedIntlProps
} from 'react-intl'
import { Button, Typography } from 'smooth-ui'

const allUsersQ = gql`
  query {
    allUsers {
      id
      name
    }
  }
`

const { description } = defineMessages({
  description: {
    defaultMessage: 'An example app integrating React Intl with Next.js',
    id: 'description'
  }
})

export class Dashboard extends Component<InjectedIntlProps> {
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

        <Typography variant="h2">
          <FormattedNumber value={9999} />
        </Typography>

        <Link href="/sign-up">
          <Button>
            <FormattedMessage id="signUp" defaultMessage="Sign up!" />
          </Button>
        </Link>

        <Query query={allUsersQ}>
          {({ loading, data: { allUsers }, error }) => {
            if (loading) {
              return <span>loading</span>
            }

            if (error) {
              return <span>error</span>
            }

            return <pre>{JSON.stringify(allUsers, null, 2)}</pre>
          }}
        </Query>
      </Fragment>
    )
  }
}
