import React, { createContext, useContext, useState } from 'react';

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
  id: any;
  username: string;
  password: string; // Note: You might want to exclude this from some operations for security reasons.
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: string;
  metrics?: string; // This is an ObjectId in Mongoose, but for TypeScript purposes, we'll represent it as a string.
  fitnessGoals?: string[];
  dietaryRequirements?: string[];
  allergies?: string[];
  preferredCuisine?: string[];
  points?: string; // This is an ObjectId in Mongoose.
  subscription: ISubscription;
  lastLogin: Date;
  mealPlans?: string[]; // These are ObjectIds in Mongoose.
  workoutPlans?: string[]; // These are ObjectIds in Mongoose.
  aiChats?: string[]; // These are ObjectIds in Mongoose.
  accountCreated: Date;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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