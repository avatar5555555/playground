import React, { Component } from 'react'
import { th, Typography } from 'smooth-ui'
import styled from 'styled-components'

import { getCurrentUser, redirect } from '~/lib'

import { SignUpForm } from './form'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${th('light')};
`

const FormBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: ${th('white')};
`

export class SignUp extends Component {
  public static async getInitialProps(context) {
    const currentUser = await getCurrentUser(context.apolloClient)

    if (currentUser) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
  }

  public render() {
    return (
      <Root>
        <FormBox>
          <Typography variant="h2">Sign up</Typography>
          <SignUpForm />
        </FormBox>
      </Root>
    )
  }
}
