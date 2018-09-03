import * as styledComponents from 'styled-components'

import { Theme } from 'src/ui'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>

export type WithOptionalTheme<P extends { theme?: Theme }> = Omit<
  P,
  'theme'
> & {
  theme?: Theme
}

export { css, injectGlobal, keyframes, ThemeProvider, withTheme }

export default styled
