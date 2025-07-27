import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripData {
  from: string;
  to: string;
  days: number;
  budget: string;
  people: number;
  preferences: string[];
}

interface TripContextType {
  tripData: TripData | null;
  setTripData: (data: TripData) => void;
  tripResults: any[];
  setTripResults: (results: any[]) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within TripProvider');
  }
  return context;
};

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [tripResults, setTripResults] = useState<any[]>([]);

  return (
    <TripContext.Provider value={{ 
      tripData, 
      setTripData, 
      tripResults, 
      setTripResults 
    }}>
      {children}
    </TripContext.Provider>
  );
};