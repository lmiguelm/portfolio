import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import Cookie from 'js-cookie';

import Router from 'next/router';

type AuthProps = {
  children: ReactNode;
};

type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  code: string;
};

type AuthContextData = {
  isLogged: boolean;
  currentUser: IUser;
  token: string;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  checkEmail(email: string): Promise<void>;
  checkCode(email: string, code: number): Promise<IUser>;
  resetPassword(id: string, password: string, code: number, email: string): Promise<void>;
  header: 'private' | 'public' | 'none';
  handleSetHeader: (value: 'private' | 'public' | 'none') => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<'private' | 'public' | 'none'>('public');

  useEffect(() => {
    let user = Cookie.get('current_user');
    let token = Cookie.get('access_token');

    if (user && token) {
      token = JSON.parse(token);
      api.defaults.headers.Authorization = token;
      setToken(token);
      setCurrentUser(JSON.parse(user));
      setIsLogged(true);
    }
  }, []);

  function handleSetHeader(value: 'private' | 'public' | 'none') {
    setHeader(value);
  }

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_APP_URL}/users/login`, {
          email,
          password,
        });

        const token = response.headers.authorization;
        const user = response.data;

        api.defaults.headers.Authorization = token;
        setIsLogged(true);
        setToken(token);
        setCurrentUser(user);

        Cookie.set('access_token', JSON.stringify(token));
        Cookie.set('current_user', JSON.stringify(user));

        resolve();
      } catch (error) {
        reject();
      }
    });
  }, []);

  const logout = useCallback(async () => {
    setIsLogged(false);
    Cookie.remove('access_token');
    Cookie.remove('current_user');
    Router.push('/auth/login');
  }, []);

  const checkEmail = useCallback(async (email: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await api.get(`${process.env.NEXT_PUBLIC_APP_URL}/users/check-user`, {
          params: {
            email,
          },
        });

        resolve();
      } catch (error) {
        reject();
      }
    });
  }, []);

  const checkCode = useCallback(async (email: string, code: number): Promise<IUser> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_APP_URL}/users/check-code`, {
          email,
          code,
        });

        resolve(response.data);
      } catch (error) {
        reject();
      }
    });
  }, []);

  const resetPassword = useCallback(
    async (id: string, password: string, code: number, email: string): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        try {
          await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/users/reset-password`, {
            password,
            id,
            email,
            code,
          });
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        checkEmail,
        checkCode,
        resetPassword,
        currentUser,
        token,
        header,
        handleSetHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
