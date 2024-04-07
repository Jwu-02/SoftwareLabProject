import React from 'react';

const CheckInBox = ({onCheckIn}) => {
  return (
      <button 
      className="button-box" 
      onClick={onCheckIn}>Check-In
      </button>
  );
}

export default CheckInBox;