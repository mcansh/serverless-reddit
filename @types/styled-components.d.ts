import type { CSSProp } from 'styled-components';

import type theme from '../theme';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
