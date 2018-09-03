import { gql } from 'apollo-boost'
import Link from 'next/link'
import { compose } from 'ramda'
import React, { Component } from 'react'
import {
  graphql,
  MutationFunc,
  withApollo,
  WithApolloClient
} from 'react-apollo'
import { Field, Form } from 'react-final-form'
import { FormattedMessage } from 'react-intl'
import { Button } from 'smooth-ui'

import styled from 'src/styled-components'

import { form, redirect } from 'src/lib'
import {
  AdaptedInput,
  FormControlFeedback,
  FormGroup,
  FormInner,
  Label
} from 'src/ui'

import { storeToken } from '../lib'

import { schema } from './schema'

const LoginM = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export class LoginFormView extends Component<
  WithApolloClient<{ login: MutationFunc }>
> {
  handleSubmit = async (values) => {
    const { login } = this.props

    try {
      const { data } = await login({ variables: values })
      this.handleSuccess(data.login.token)
    } catch (error) {
      return {
        email: 'credentials are incorrect',
        password: 'credentials are incorrect'
      }
    }
  }

  handleSuccess = (token) => {
    storeToken(token)

    // Force a reload of all the current queries now that the user is logged in
    this.props.client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        validate={form.validateForm({ schema })}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <FormInner onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">
                <FormattedMessage
                  id="login.emailLabel"
                  defaultMessage="email"
                />
              </Label>

              <Field control id="email" name="email" component={AdaptedInput} />

              <FormControlFeedback name="email" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <FormattedMessage
                  id="login.passwordLabel"
                  defaultMessage="password"
                />
              </Label>

              <Field
                control
                id="password"
                name="password"
                type="password"
                component={AdaptedInput}
              />

              <FormControlFeedback name="password" />
            </FormGroup>

            <Buttons>
              <Button type="submit" disabled={submitting}>
                <FormattedMessage
                  id="login.submit"
                  defaultMessage="log in now"
                />
              </Button>

              <Link href="/sign-up" prefetch>
                <Button type="button" variant="light">
                  <FormattedMessage
                    id="login.signup"
                    defaultMessage="or sign up"
                  />
                </Button>
              </Link>
            </Buttons>
          </FormInner>
        )}
      </Form>
    )
  }
}

const enhance = compose(
  withApollo,
  graphql(LoginM, { name: 'login' })
)

export const LoginForm = enhance(LoginFormView)
