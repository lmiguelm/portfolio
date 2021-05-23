import { AuthProvider } from '../contexts/AuthContext';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle } from '../styles/global';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StylesProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </StylesProvider>
    </AuthProvider>
  );
}
