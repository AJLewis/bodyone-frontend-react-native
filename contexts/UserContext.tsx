import React, { createContext, useContext, useState } from 'react';
import defaultTheme from '../assets/json/default-dark.json';

export enum SubscriptionType {
  FREE = 'free',
  PREMIUM = 'premium',
  PRO = 'pro',
  // Add more subscription types as needed
}

export interface ISubscription {
  type: SubscriptionType;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface IUser {
  _id: any;
  username: string;
  password: string; // Note: You might want to exclude this from some operations for security reasons.
  email: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  handle: string;
  dateOfBirth?: Date;
  gender?: string;
  metrics?: string; // This is an ObjectId in Mongoose, but for TypeScript purposes, we'll represent it as a string.
  fitnessGoals?: string[];
  dietaryRequirements?: string[];
  allergies?: string[];
  preferredCuisine?: string[];
  points?: any; // This is an ObjectId in Mongoose.
  subscription: ISubscription;
  lastLogin: Date;
  mealPlans?: string[]; // These are ObjectIds in Mongoose.
  workoutPlans?: string[]; // These are ObjectIds in Mongoose.
  aiChats?: string[]; // These are ObjectIds in Mongoose.
  accountCreated: Date;
}

export interface IMessage {
  sender: IUser;
  receiver: IUser;
  previousMessage?: IMessage;
  subject: string;
  content: string;
  date: Date;
  viewed: boolean;
}

export interface INotification {
  user: IUser;
  content: string;
  date: Date;
  viewed: boolean;
  action?: IAction;
}

export interface IAction {
  type: string;
  payload: any;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  theme: any; // You can replace 'any' with a more specific type if you have one for the theme.
  setTheme: React.Dispatch<React.SetStateAction<any>>; 
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;

}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [theme, setTheme] = useState<any>(null || defaultTheme);
  const [notifications, setNotifications] = useState<any>(null);
  const [messages, setMessages] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser, theme, setTheme, notifications, setNotifications, messages, setMessages}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};