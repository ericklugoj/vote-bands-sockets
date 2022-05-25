import React from 'react';
import { SocketProvider } from './context/SocketContext';
import HomePage from './pages/HomePage';

const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};

export default BandNamesApp;
