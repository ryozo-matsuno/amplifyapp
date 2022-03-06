import React, { createContext, useState, useContext } from 'react';

const ListBIContext = createContext();
const bookInfoRecord = {isbn:"",Title:"",Author:"",CatalogPrice:"",Label:"",PublicationDate:"",Publisher:"",PurchaseDate:"",PurchaseLocation:"",RealPrice:"",Series:""};
const bookInfoRecords = {bookInfoRecord};

export function useListBIContext() {
  return useContext(ListBIContext);
}

export function ListBIProvider({ children }) {
  const [biRecs, setBIrecs] = useState(bookInfoRecords);

  const value = {
    biRecs,
    setBIrecs,
  };

  return (
    <ListBIContext.Provider value={value}>{children}</ListBIContext.Provider>
  );
}