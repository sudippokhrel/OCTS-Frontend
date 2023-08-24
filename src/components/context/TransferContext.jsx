// TransferContext.jsx

import React, { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [transferRequests, setTransferRequests] = useState([]);

  const addTransferRequest = (request) => {
    setTransferRequests([...transferRequests, request]);
  };

  return (
    <TransferContext.Provider value={{ transferRequests, addTransferRequest }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransferContext = () => useContext(TransferContext);