import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: 'dark' | 'light';

    colors: {
      backgroundPrimary: string;
      backgroundSecondary: string;
      colorPrimary: string;
      colorSecondary: string;
      textPrimary: string;
      textSecondary: string;
    };
  }
}
