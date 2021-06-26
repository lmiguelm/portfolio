import { useContext } from 'react';
import { StylesContext } from '../contexts/StylesContext';

export function useStylesContext() {
  const useStylesContext = useContext(StylesContext);
  return useStylesContext;
}
