import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { Header } from '../components/Header';

import { firebase } from '../services/firebase';

import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../styles/global';
import { Dark } from '../styles/themes/dark';
import { Light } from '../styles/themes/light';
import { loadTheme } from '../utils/theme';

export default function App({ Component, pageProps }) {
  const [applicationTheme, setApplicationTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    firebase.analytics();
  }, []);

  useEffect(() => {
    const theme = loadTheme();
    setApplicationTheme(theme);
  }, []);

  function toggleTheme() {
    const newTheme = applicationTheme === 'dark' ? 'light' : 'dark';

    Cookies.set('@lmiguelm:theme', JSON.stringify(newTheme));
    setApplicationTheme(newTheme);
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={applicationTheme === 'dark' ? Dark : Light}>
        <GlobalStyle />
        <Header />
        <Component toggleTheme={toggleTheme} {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
