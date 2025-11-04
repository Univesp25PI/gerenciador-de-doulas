import React, { createContext, useContext } from 'react';
import { useContrast } from '../hooks/useContrast';

const ContrastContext = createContext();

export function ContrastProvider({ children }) {
  const contrast = useContrast();

  return (
    <ContrastContext.Provider value={contrast}>
      {children}
    </ContrastContext.Provider>
  );
}

export function useContrastContext() {
  const context = useContext(ContrastContext);
  if (!context) {
    throw new Error('useContrastContext deve ser usado dentro de ContrastProvider');
  }
  return context;
}