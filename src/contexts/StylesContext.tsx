import { createContext, ReactNode, useContext, useState } from 'react';

type StyleContextData = {
  currentPage: string;
  scrollProgress: number;
  handleCurrentPage: (page: string) => void;
  handleScroll: (value: number) => void;
};

const StylesContext = createContext({} as StyleContextData);

type StylesProviderProps = {
  children: ReactNode;
};

export function StylesProvider({ children }: StylesProviderProps) {
  const [currentPage, setCurrentPage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  function handleCurrentPage(page: string) {
    setCurrentPage(page);
  }

  function handleScroll(value: number) {
    setScrollProgress(value);
  }

  return (
    <StylesContext.Provider
      value={{ currentPage, handleCurrentPage, scrollProgress, handleScroll }}
    >
      {children}
    </StylesContext.Provider>
  );
}

export function useStylesContext() {
  const useStylesContext = useContext(StylesContext);
  return useStylesContext;
}
