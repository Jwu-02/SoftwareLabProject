import React, { useState } from 'react';

const EnterQtyBox = ({ initialQty, onQtyChange }) => {
  
  const [qty, setQty] = useState(initialQty);

  const handleChange = (e) => {
    const newQty = parseInt(e.target.value);
    setQty(newQty);
    onQtyChange(newQty);
  };

  return (
      <input
          className="input-box"
          type="number"
          value={qty}
          onChange={handleChange}
          placeholder="Enter Qty"
      />
    
  );
};

export default EnterQtyBox;