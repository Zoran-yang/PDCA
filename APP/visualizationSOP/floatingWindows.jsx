import React, { useState } from 'react';

function FloatingWindow(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleWindow}>Open Window</button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
          }}
        >
          {props.children(toggleWindow)}
        </div>
      )}
    </div>
  );
}

export default FloatingWindow;