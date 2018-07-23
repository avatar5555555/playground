import { injectIntl } from 'react-intl'

import { hoistStatics } from '~/lib'

export const withIntl = hoistStatics(injectIntl)
