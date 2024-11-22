import React from 'react';

interface ConfirmOrderButtonProps {
  handleConfirmOrder: () => void;
}

const ConfirmOrderButton: React.FC<ConfirmOrderButtonProps> = ({ handleConfirmOrder }) => {
  return (
    <button onClick={handleConfirmOrder} className="btn btn-primary">
      Confirm Order
    </button>
  );
};

export default ConfirmOrderButton;
