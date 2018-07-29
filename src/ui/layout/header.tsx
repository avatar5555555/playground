import Link from 'next/link'
import { pathOr } from 'ramda'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, th } from 'smooth-ui'
import styled from 'styled-components'

import { query } from 'src/lib/get-current-user'

const Root = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${th('light')};
  height: 56px;
  flex-shrink: 0;
`

const Logo = styled.a`
  display: block;
  cursor: pointer;
  color: ${th('primary')};
  font-size: ${th('h4FontSize')};
  text-transform: uppercase;
`

const getCurrentUser = pathOr(null, ['currentUser'])

export class Header extends Component<{ logout: () => void }> {
  render() {
    return (
      <Root>
        <Link href="/" prefetch>
          <Logo>
            <FormattedMessage id="layout.logo" defaultMessage="playground" />
          </Logo>
        </Link>

        <Query query={query} fetchPolicy="cache-and-network">
          {({ data }) => {
            const currentUser = getCurrentUser(data)

            if (currentUser === null) {
              return null
            }

            return (
              <Button onClick={this.props.logout} variant="secondary">
                <FormattedMessage id="layout.logout" defaultMessage="logout" />
              </Button>
            )
          }}
        </Query>
      </Root>
    )
  }
}
