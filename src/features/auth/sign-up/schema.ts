import * as yup from 'yup'

// TODO: add i18n for error messages
export const schema = yup.object().shape({
  email: yup
    .string()
    .ensure()
    .required()
    .email(),

  name: yup
    .string()
    .ensure()
    .required(),

  password: yup
    .string()
    .ensure()
    .min(8)
    .max(20)
    .required()
})
