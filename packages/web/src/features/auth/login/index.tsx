import hoistStatic from 'hoist-non-react-statics'
import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'

import { PageTemplate } from '../template'

import { LoginForm } from './form'

const { title } = defineMessages({
  title: {
    defaultMessage: 'log in',
    id: 'login.title'
  }
})

export class LoginRaw extends Component<InjectedIntlProps> {
  render() {
    return (
      <PageTemplate title={title} {...this.props}>
        <LoginForm />
      </PageTemplate>
    )
  }
}

export const Login = hoistStatic(LoginRaw, PageTemplate)
