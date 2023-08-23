import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the interfaces without mongoose-specific types
export interface IAction {
  type: string;
  payload: any;
}

export interface INotification {
  user: string;
  content: string;
  date: Date;
  viewed: boolean;
  action?: IAction;
}

export interface IMessage {
  sender: string;
  receiver: string;
  senderHandle: string;
  previousMessage?: IMessage;
  subject: string;
  content: string;
  date: Date;
  viewed: boolean;
}

interface MessagesContextType {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages, notifications, setNotifications }}>
      {children}
    </MessagesContext.Provider>
  );
};