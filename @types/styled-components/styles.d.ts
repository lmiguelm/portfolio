import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      backgroundPrimary: string;
      backgroundSecondary: string;
      colorPrimary: string;
      colorSecondary: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
    };
  }
}
