import React, { createContext, useContext, useEffect, useState } from 'react';

export const useDataContext = () => {
  return useContext(DataContext);
}

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
  
  return (
    <DataContext.Provider value={{
      
    
    }}>
      {children}
    </DataContext.Provider>
  )
}