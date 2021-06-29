import { useEffect } from 'react';
import { createContext, ReactNode, useCallback, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type IUser = {
  avatar: string;
  id: string;
  name: string;
  email: string;
};

type IHeader = 'private' | 'public' | 'none';

type IAuthContext = {
  header: IHeader;
  handleSetHeader: (value: IHeader) => void;
  user: IUser | undefined;
  signinWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
  loadedAuth: boolean;
};

export const AuthContext = createContext({} as IAuthContext);

type IAuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>();
  const [header, setHeader] = useState<IHeader>('public');
  const [loadedAuth, setLoadedAuth] = useState<boolean>(false);

  useEffect(() => {
    setLoadedAuth(false);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        try {
          if (email !== process.env.NEXT_PUBLIC_EMAIL) {
            throw new Error('Acesso negado!');
          }

          setUser({ name: displayName, avatar: photoURL, id: uid, email });
        } catch (error) {
          throw new Error(error.message);
        } finally {
          setLoadedAuth(true);
        }
      } else {
        setLoadedAuth(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signinWithGoogle = useCallback(async () => {
    setLoadedAuth(false);
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const { displayName, photoURL, uid, email } = user;
      try {
        if (email !== process.env.NEXT_PUBLIC_EMAIL) {
          throw new Error('Acesso negado!');
        }

        setUser({ name: displayName, avatar: photoURL, id: uid, email });
      } catch (error) {
        throw new Error(error.message);
      } finally {
        setLoadedAuth(true);
      }
    } else {
      setLoadedAuth(true);
    }
  }, []);

  const signout = useCallback(async () => {
    try {
      await auth.signOut();
      setUser(undefined);
    } catch {
      throw new Error('Não foi possivel deslogar');
    }
  }, []);

  const handleSetHeader = useCallback((value: IHeader) => {
    setHeader(value);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signinWithGoogle, header, handleSetHeader, signout, loadedAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
