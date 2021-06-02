import { createContext, ReactNode, useContext, useState } from 'react';

type StyleContextData = {
  currentPage: string;
  scrollProgress: number;
  isDarkTheme: boolean;
  handleCurrentPage: (page: string) => void;
  handleScroll: (value: number) => void;
  changeTheme: () => void;
};

const StylesContext = createContext({} as StyleContextData);

type StylesProviderProps = {
  children: ReactNode;
};

export function StylesProvider({ children }: StylesProviderProps) {
  const [currentPage, setCurrentPage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  function handleCurrentPage(page: string) {
    setCurrentPage(page);
  }

  function handleScroll(value: number) {
    setScrollProgress(value);
  }

  function changeTheme() {
    setIsDarkTheme(!isDarkTheme);
  }

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

export function useStylesContext() {
  const useStylesContext = useContext(StylesContext);
  return useStylesContext;
}
