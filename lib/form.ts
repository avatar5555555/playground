/**
 * Mostly borrowed from Formik
 * See https://github.com/jaredpalmer/formik/blob/master/src/types.tsx
 * and https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx
 */
import { setIn } from 'final-form'
import { curry } from 'ramda'

export interface IFormValues {
  [field: string]: any
}

export type FormErrors<Values> = {
  [K in keyof Values]?: Values[K] extends object ? FormErrors<Values[K]> : {}
}

// Transform Yup ValidationError to a more usable object
export function yupToFormErrors<Values>(yupError: any): FormErrors<Values> {
  // tslint:disable-next-line:no-object-literal-type-assertion
  let errors: any = {} as FormErrors<Values>
  for (const err of yupError.inner) {
    if (!errors[err.path]) {
      errors = setIn(errors, err.path, err.message)
    }
  }

  return errors
}

// Validate a yup schema.
export function validateYupSchema<T extends IFormValues>(
  values: T,
  schema: any,
  sync: boolean = false,
  context: any = {}
): Promise<Partial<T>> {
  const validateData: Partial<T> = {}
  for (const k in values) {
    if (values.hasOwnProperty(k)) {
      const key = String(k)
      validateData[key] = values[key] !== '' ? values[key] : undefined
    }
  }

  return schema[sync ? 'validateSync' : 'validate'](validateData, {
    abortEarly: false,
    context
  })
}

export interface IOption {
  schema: any
  sync?: boolean
  context?: any
}

export const validateForm = curry((options: IOption, values: IFormValues) => {
  const { schema, sync, context } = options

  return validateYupSchema(values, schema, sync, context)
    .then(() => ({})) // No validation errors
    .catch((error) => yupToFormErrors(error))
})
