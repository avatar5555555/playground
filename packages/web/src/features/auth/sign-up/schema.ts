import { defineMessages } from 'react-intl'
import * as yup from 'yup'

const i18n = defineMessages({
  // email
  emailFormat: {
    defaultMessage: 'should be valid email',
    id: 'signup.email.format'
  },
  emailRequired: {
    defaultMessage: 'email is required',
    id: 'signup.email.required'
  },

  // name
  nameRequired: {
    defaultMessage: 'name is required',
    id: 'signup.name.required'
  },

  // password
  passwordMax: {
    defaultMessage: 'password must be at most 20 characters',
    id: 'signup.password.max'
  },
  passwordMin: {
    defaultMessage: 'password must be at least 8 characters',
    id: 'signup.password.min'
  },
  passwordRequired: {
    defaultMessage: 'password is required',
    id: 'signup.password.required'
  }
})

export const schema = yup.object().shape({
  email: yup
    .string()
    .ensure()
    .required(i18n.emailRequired.id)
    .email(i18n.emailFormat.id),

  name: yup
    .string()
    .ensure()
    .required(i18n.nameRequired.id),

  password: yup
    .string()
    .ensure()
    .required(i18n.passwordRequired.id)
    .min(8, i18n.passwordMin.id)
    .max(20, i18n.passwordMax.id)
})
