import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {
  const [bandName, setBandName] = useState('');
  const { socket } = useContext(SocketContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bandName.trim().length > 0) {
      socket.emit('create-band', { bandName });
      setBandName('');
    }
  };

  const handleInputChange = (event) => {
    setBandName(event.target.value);
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nueva Banda'
          value={bandName}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default BandAdd;
