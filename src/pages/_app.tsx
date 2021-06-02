import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { StylesProvider } from '../contexts/StylesContext';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';

import { Dark } from '../styles/themes/dark';
import { Light } from '../styles/themes/light';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { loadTheme } from '../utils/theme';

export default function App({ Component, pageProps }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const theme = loadTheme();
    setIsDarkTheme(theme === 'dark' ? true : false);
  }, []);

  function toggleTheme() {
    Cookies.set('@lmiguelm:theme', JSON.stringify(!isDarkTheme ? 'dark' : 'light'));
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <AuthProvider>
      <StylesProvider>
        <ThemeProvider theme={isDarkTheme ? Dark : Light}>
          <GlobalStyle />
          <Header />
          <Component
            isDarkTheme={isDarkTheme}
            toggleThemeApplication={toggleTheme}
            {...pageProps}
          />
        </ThemeProvider>
      </StylesProvider>
    </AuthProvider>
  );
}
