import { Header } from '../components/ExternalHeader';
import { AuthProvider } from '../contexts/AuthContext';
import { StylesProvider } from '../contexts/StylesContext';
import { GlobalStyle } from '../styles/global';

export default function App({ Component, pageProps }) {
  const showHeader = !(
    String(Component).includes('Login') ||
    String(Component).includes('Forgot') ||
    String(Component).includes('Dashboard')
  );

  return (
    <AuthProvider>
      <StylesProvider>
        <GlobalStyle />
        {showHeader && <Header />}
        <Component {...pageProps} />
      </StylesProvider>
    </AuthProvider>
  );
}
