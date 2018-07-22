import { compose } from 'ramda'
import { injectIntl } from 'react-intl'

import { withLayout } from './withLayout'
import { withTheme } from './withTheme'

export const pageWithoutLayout = compose(
  withTheme,
  injectIntl
)

export const page = compose(
  pageWithoutLayout,
  withLayout
)
