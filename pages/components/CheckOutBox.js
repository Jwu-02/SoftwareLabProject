import React from 'react';

const CheckOutBox = ({ onCheckOut }) => {
  return (
    <button 
    className="button-box" 
    onClick={onCheckOut}>Check-Out</button>
  );
};

export default CheckOutBox;