import { useEffect, createContext, useState, useContext, ReactNode } from 'react';
import { api } from '../services/api';
import Cookie from 'js-cookie';

type AuthProps = {
  children: ReactNode;
};

type AuthContextData = {
  isLogged: boolean;
  login(email: string, password: string, remember: boolean): Promise<void>;
  logout(): void;
  checkEmail(email: string): Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProps) {
  const [isLogged, setIsLogged] = useState(false);

  async function login(email: string, password: string, remember: boolean): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(`http://localhost:3333/api/users/login`, {
          email,
          password,
        });

        const token = response.headers.authorization;

        api.defaults.headers = token;
        setIsLogged(true);

        if (remember) {
          Cookie.set('access_token', JSON.stringify(token));
        }

        resolve();
      } catch (error) {
        reject();
      }
    });
  }

  async function logout() {
    setIsLogged(false);
    Cookie.remove('access_token');
  }

  async function checkEmail(email: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(`http://localhost:3333/api/users/email`, {
          params: {
            email,
          },
        });

        resolve();
      } catch (error) {
        reject();
      }
    });
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, checkEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
