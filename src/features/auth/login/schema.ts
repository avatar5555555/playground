import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup
    .string()
    .ensure()
    .required()
    .email(),

  password: yup
    .string()
    .ensure()
    .min(8)
    .max(20)
    .required()
})