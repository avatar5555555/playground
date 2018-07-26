import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'
import { FormattedMessage } from 'react-intl'
import {
  Checkbox,
  ControlFeedback,
  Input,
  Radio,
  Select,
  Textarea
} from 'smooth-ui'
import styled from 'styled-components'

const adapt = (W) => ({
  input,
  meta: { touched, valid },
  ...rest
}: FieldRenderProps) => {
  const componentProps = {
    ...input,
    ...rest,
    valid: touched ? valid : undefined
  }

  return <W {...componentProps} />
}

export const AdaptedInput = adapt(Input)
export const AdaptedCheckbox = adapt(Checkbox)
export const AdaptedRadio = adapt(Radio)
export const AdaptedSelect = adapt(Select)
export const AdaptedTextarea = adapt(Textarea)

interface IFormControlFeedback {
  name: string
}

const Feedback = styled(ControlFeedback)`
  margin-top: 0;
  height: 19px;
`

enum FieldErrorType {
  none,
  validation,
  submit
}

interface IErrorMessage {
  message?: string
  type: FieldErrorType
}

const extractErrorMessage = ({
  touched = false,
  error = null,
  dirtySinceLastSubmit = false,
  submitError = null
}): IErrorMessage => {
  const hasValidationError = error && touched

  if (hasValidationError) {
    return {
      message: error,
      type: FieldErrorType.validation
    }
  }

  const hasSubmitError = submitError && !dirtySinceLastSubmit

  if (hasSubmitError) {
    return {
      message: submitError,
      type: FieldErrorType.submit
    }
  }

  return {
    message: null,
    type: FieldErrorType.none
  }
}

// Workaround for messages extractor
// See https://github.com/yahoo/babel-plugin-react-intl/issues/119#issuecomment-326202499
const T = (p) => <FormattedMessage {...p} />

export const FormControlFeedback = ({ name }: IFormControlFeedback) => (
  <Field
    name={name}
    subscription={{
      dirtySinceLastSubmit: true,
      error: true,
      submitError: true,
      touched: true
    }}
  >
    {({ meta }) => {
      const { message, type } = extractErrorMessage(meta)
      const valid = type === FieldErrorType.none

      return (
        <Feedback valid={valid}>{valid ? null : <T id={message} />}</Feedback>
      )
    }}
  </Field>
)

export const FormGroup = styled.div`
  margin-bottom: 6px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 2px;
`
