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

import * as api from 'API'
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

const SignUpM = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
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

export class SignUpFormView extends Component<
  WithApolloClient<{ signup: MutationFunc }>
> {
  handleSubmit = async (values: api.SignupInput) => {
    const { signup } = this.props

    try {
      const { data } = await signup({ variables: { data: values } })
      this.handleSuccess(data.signup.token)
    } catch (error) {
      return this.handleError(error)
    }
  }

  handleError = ({ graphQLErrors: [{ message }] }) => {
    return { email: message }
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
              <Label htmlFor="name">
                <FormattedMessage id="signup.nameLabel" defaultMessage="name" />
              </Label>

              <Field control id="name" name="name" component={AdaptedInput} />

              <FormControlFeedback name="name" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FormattedMessage
                  id="signup.emailLabel"
                  defaultMessage="email"
                />
              </Label>

              <Field control id="email" name="email" component={AdaptedInput} />

              <FormControlFeedback name="email" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <FormattedMessage
                  id="signup.passwordLabel"
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
                  id="signup.submit"
                  defaultMessage="sign up now!"
                />
              </Button>

              <Link href="/login" prefetch>
                <Button type="button" variant="light">
                  <FormattedMessage
                    id="signup.login"
                    defaultMessage="or log in"
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
  graphql(SignUpM, { name: 'signup' })
)

export const SignUpForm = enhance(SignUpFormView)
