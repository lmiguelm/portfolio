import { Header } from '../components/Header';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle } from '../styles/global';

export default function App({ Component, pageProps }) {
  return (
    <StylesProvider>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </StylesProvider>
  );
}
