import { injectIntl } from 'react-intl'

import { hoistStatics } from 'src/lib'

export const withIntl = hoistStatics(injectIntl)
