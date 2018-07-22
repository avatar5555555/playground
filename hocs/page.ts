import { compose } from 'ramda'
import { injectIntl } from 'react-intl'

import { withLayout } from './with-layout'
import { withTheme } from './with-theme'

export const pageWithoutLayout = compose(
  withTheme,
  injectIntl
)

export const page = compose(
  pageWithoutLayout,
  withLayout
)
