import hoistStatic from 'hoist-non-react-statics'
import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'

import { PageTemplate } from '../../templates'

import { SignUpForm } from './form'

const { title } = defineMessages({
  title: {
    defaultMessage: 'sign up!',
    id: 'signup.title'
  }
})

export class SignUpView extends Component<InjectedIntlProps> {
  render() {
    return (
      <PageTemplate title={title} {...this.props}>
        <SignUpForm />
      </PageTemplate>
    )
  }
}

export const SignUp = hoistStatic(SignUpView, PageTemplate)
