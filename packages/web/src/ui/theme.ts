import { defaultTheme } from 'smooth-ui'
import styledNormalize from 'styled-normalize'

import { injectGlobal } from 'src/styled-components'

// See https://smooth-ui.smooth-code.com/#extending-styles
export const theme = {
  ...defaultTheme
}

export type Theme = typeof theme

export const applyGlobalStyles = () => injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  ${styledNormalize}

  html, body, #__next {
    height: 100%;
  }
`

applyGlobalStyles()
