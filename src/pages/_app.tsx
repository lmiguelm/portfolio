import { ThemeProvider } from 'styled-components';
import { Header } from '../components/Header';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle, theme } from '../styles/global';

export default function App({ Component, pageProps }) {
  return (
    <StylesProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  );
}
