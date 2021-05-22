import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle } from '../styles/global';

export default function App({ Component, pageProps }) {
  const isLoginPage = String(Component).includes('Login');

  return (
    <AuthProvider>
      <StylesProvider>
        <GlobalStyle />
        {!isLoginPage && <Header />}
        <Component {...pageProps} />
      </StylesProvider>
    </AuthProvider>
  );
}
