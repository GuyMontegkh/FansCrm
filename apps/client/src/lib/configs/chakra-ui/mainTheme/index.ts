import { DeepPartial, extendTheme, theme, ThemeOverride } from '@chakra-ui/react';

import * as components from './overrides';
import { colors } from './colors';

// import '@fontsource-variable/open-sans'
// import '@fontsource-variable/raleway'

const themeConfig: DeepPartial<ThemeOverride> = {
  colors,
  styles: {
    global: () => ({
      html: { height: '100%' },
      body: {
        height: '100%',
        bg: 'black',
        color: 'concrete',
        display: 'flex',
        flexDirection: 'column',
        minH: '100%',
        backgroundColor: '#17171D',
      },
    }),
  },
  fonts: {
    heading: 'var(--font-DM-sans)',
    body: 'var(--font-DM-sans)',
    // heading: `'Open Sans', sans-serif`,
    // body: `'Raleway', sans-serif`,
  },
  breakpoints: {
    sm: '375px',
    md: '768px',
    xl: '1440px',
  },
  components: { ...theme.components, ...components },
  config: {
    initialColorMode: 'light',
  },
};

export const mainTheme = extendTheme(themeConfig);
