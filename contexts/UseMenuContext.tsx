import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuItem {
  id: number;
  name: string;
  route: string;
}

interface MenuContextType {
  slideInNavigation: MenuItem[];
  setSlideInNavigation: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  isMenuVisible: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isNotificationsMenuVisible: boolean;
  setNotificationsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isSettingsVisible: boolean;
  setSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [isNotificationsMenuVisible, setNotificationsMenuVisible] = useState<boolean>(false);
  const [isSettingsVisible, setSettingsVisible] = useState<boolean>(false);


  return (
    <MenuContext.Provider value={{ slideInNavigation, setSlideInNavigation, isMenuVisible, setMenuVisible, isNotificationsMenuVisible, setNotificationsMenuVisible, isSettingsVisible, setSettingsVisible }}>
      {children}
    </MenuContext.Provider>
  );
};