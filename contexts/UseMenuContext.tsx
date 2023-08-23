import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuItem {
  id: number;
  name: string;
  route: string;
}

interface MenuContextType {
  slideInNavigation: MenuItem[];
  setSlideInNavigation: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [slideInNavigation, setSlideInNavigation] = useState<MenuItem[]>([]);

  return (
    <MenuContext.Provider value={{ slideInNavigation, setSlideInNavigation }}>
      {children}
    </MenuContext.Provider>
  );
};