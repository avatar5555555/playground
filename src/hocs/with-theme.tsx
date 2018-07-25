import React from 'react'
import { ThemeProvider } from 'styled-components'

import { hoistStatics } from 'src/lib'
import { theme } from 'src/ui'

const withThemeHoc = (W) => (props) => (
  <ThemeProvider theme={theme}>
    <W {...props} />
  </ThemeProvider>
)

export const withTheme = hoistStatics(withThemeHoc)
