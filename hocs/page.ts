import { compose } from 'ramda'

import { withLayout } from './withLayout'
import { withTheme } from './withTheme'

export const pageWithoutLayout = compose(withTheme)

export const page = compose(
  pageWithoutLayout,
  withLayout
)
