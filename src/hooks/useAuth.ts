import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Routes from 'next/router';

export type useAuthType = {
  route?: 'public' | 'private';
  header?: 'public' | 'private' | 'none';
  setHeader?: boolean;
};

export function useAuth({ header = 'public', setHeader = true, route = 'public' }: useAuthType) {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (setHeader) {
      auth.handleSetHeader(header);
    }
  }, [auth.header]);

  useEffect(() => {
    if (!auth.user && auth.loadedAuth && route === 'private') {
      Routes.push('/auth/login');
    }
  }, [auth.user, auth.loadedAuth]);

  return auth;
}
