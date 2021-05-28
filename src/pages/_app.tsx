import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle } from '../styles/global';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </StylesProvider>
    </AuthProvider>
  );
}
