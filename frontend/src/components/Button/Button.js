import React from 'react';
import './Button.css'

function Button({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;