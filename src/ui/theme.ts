import { defaultTheme } from 'smooth-ui'
import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

// See https://smooth-ui.smooth-code.com/#extending-styles
export const theme = {
  ...defaultTheme
}

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
