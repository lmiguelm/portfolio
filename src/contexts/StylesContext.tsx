import { createContext, ReactNode, useContext, useState } from 'react';

type StyleContextData = {
  currentPage: string;
  handleCurrentPage: (page: string) => void;
};

const StylesContext = createContext({} as StyleContextData);

type StylesProviderProps = {
  children: ReactNode;
};

export function StylesProvider({ children }: StylesProviderProps) {
  const [currentPage, setCurrentPage] = useState('home');

  function handleCurrentPage(page: string) {
    setCurrentPage(page);
  }

  return (
    <StylesContext.Provider value={{ currentPage, handleCurrentPage }}>
      {children}
    </StylesContext.Provider>
  );
}

export function useStylesContext() {
  const useStylesContext = useContext(StylesContext);
  return useStylesContext;
}
