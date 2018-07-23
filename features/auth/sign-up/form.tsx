import React, { Component } from 'react'
import { Field, Form } from 'react-final-form'
import { FormattedMessage } from 'react-intl'
import { Button, FormGroup, Label } from 'smooth-ui'

import { form } from '~/lib'
import { AdaptedInput, FormControlFeedback, FormInner } from '~/ui'

import { schema } from './schema'

export class SignUpForm extends Component {
  public handleSubmit = (values) => {
    return values
  }

  public render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        validate={form.validateForm({ schema })}
        subscription={{}}
      >
        {({ handleSubmit }) => {
          return (
            <FormInner onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">
                  <FormattedMessage
                    id="login.emailLabel"
                    defaultMessage="email"
                  />
                </Label>

                <Field
                  control
                  id="email"
                  name="email"
                  component={AdaptedInput}
                />

                <FormControlFeedback name="email" />
              </FormGroup>

              <Button type="submit">confirm</Button>
            </FormInner>
          )
        }}
      </Form>
    )
  }
}
