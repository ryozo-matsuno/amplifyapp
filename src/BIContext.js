import React, { createContext, useState, useContext } from 'react';

const BIContext = createContext();
const bookInfoRecord = {isbn:"",Title:"",Author:"",CatalogPrice:"",Label:"",PublicationDate:"",Publisher:"",PurchaseDate:"",PurchaseLocation:"",RealPrice:"",Series:""};


export function useBIContext() {
  return useContext(BIContext);
}

export function BIProvider({ children }) {
  const [biRecord, setBI] = useState(bookInfoRecord);

  const value = {
    biRecord,
    setBI,
  };

  return (
    <BIContext.Provider value={value}>{children}</BIContext.Provider>
  );
}