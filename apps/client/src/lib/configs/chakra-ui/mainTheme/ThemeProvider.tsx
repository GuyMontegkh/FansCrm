import { FC, useMemo } from 'react';
import { ChakraProvider, ChakraProviderProps, cookieStorageManagerSSR, localStorageManager } from '@chakra-ui/react';

import { mainTheme } from '../mainTheme';

interface IProps {
  cookies?: string;
}

export const ThemeProvider: FC<IProps & ChakraProviderProps> = ({ cookies, children, theme = mainTheme }) => {
  const colorModeManager = useMemo(() => (typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager), [cookies]);

  return (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};
