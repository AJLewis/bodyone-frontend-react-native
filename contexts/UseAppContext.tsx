import React, { createContext, useContext, useState } from 'react';
import { StatusBar } from 'react-native';

interface AppContextProps {
  headerHeight: number | null;
  setHeaderHeight: React.Dispatch<React.SetStateAction<number | null>>;
  // Add other states as needed
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<any> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);

  const getHeaderAndStatusHeight = () => {
    if(headerHeight && StatusBar && StatusBar.currentHeight) {
      return headerHeight + StatusBar?.currentHeight;
    }
  }
  // Initialize other states here

  return (
    <AppContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;