import React, { createContext, useContext, useState, } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => {
  return useContext(RefreshContext);
};

export const RefreshProvider = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const triggerRefresh = () => {
    setShouldRefresh(true);
  };

  const resetRefresh = () => {
    setShouldRefresh(false);
  };

  return (
    <RefreshContext.Provider value={{ shouldRefresh, triggerRefresh, resetRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
