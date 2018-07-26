import { defineMessages } from 'react-intl'
import * as yup from 'yup'

const i18n = defineMessages({
  // email
  emailFormat: {
    defaultMessage: 'should be valid email',
    id: 'login.email.format'
  },
  emailRequired: {
    defaultMessage: 'email is required',
    id: 'login.email.required'
  },

  // password
  passwordMax: {
    defaultMessage: 'password must be at most 20 characters',
    id: 'login.password.max'
  },
  passwordMin: {
    defaultMessage: 'password must be at least 8 characters',
    id: 'login.password.min'
  },
  passwordRequired: {
    defaultMessage: 'password is required',
    id: 'login.password.required'
  }
})

export const schema = yup.object().shape({
  email: yup
    .string()
    .ensure()
    .required(i18n.emailRequired.id)
    .email(i18n.emailFormat.id),

  password: yup
    .string()
    .ensure()
    .required(i18n.passwordRequired.id)
    .min(8, i18n.passwordMin.id)
    .max(20, i18n.passwordMax.id)
})
