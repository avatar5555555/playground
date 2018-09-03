import cookie from 'cookie'
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import styled from 'src/styled-components'

import { redirect } from 'src/lib'

import { Header } from 'src/ui'

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
`

interface IBaseLayoutProps {
  children: React.ReactNode
}

export class BaseLayout extends Component<IBaseLayoutProps> {
  logout = (apolloClient) => () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/login')
    })
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          return (
            <Root>
              <Header logout={this.logout(client)} />
              <Main>{this.props.children}</Main>
            </Root>
          )
        }}
      </ApolloConsumer>
    )
  }
}
