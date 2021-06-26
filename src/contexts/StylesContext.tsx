import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type StyleContextData = {
  currentPage: string;
  scrollProgress: number;
  isDarkTheme: boolean;
  handleCurrentPage: (page: string) => void;
  handleScroll: (value: number) => void;
  changeTheme: () => void;
};

export const StylesContext = createContext({} as StyleContextData);

type StylesProviderProps = {
  children: ReactNode;
};

export function StylesProvider({ children }: StylesProviderProps) {
  const [currentPage, setCurrentPage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleCurrentPage = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  const handleScroll = useCallback((value: number) => {
    setScrollProgress(value);
  }, []);

  const changeTheme = useCallback(() => {
    setIsDarkTheme((oldstate) => !oldstate);
  }, []);

  return (
    <StylesContext.Provider
      value={{
        currentPage,
        handleCurrentPage,
        scrollProgress,
        handleScroll,
        isDarkTheme,
        changeTheme,
      }}
    >
      {children}
    </StylesContext.Provider>
  );
}
