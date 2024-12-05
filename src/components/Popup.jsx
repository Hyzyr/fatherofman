import React from 'react';
import { createPortal } from 'react-dom';

const Popup = ({ active, close, addClass, children }) => {
  const closePopup = (event) => {
    if (event.target === event.currentTarget) close();
  };

  return createPortal(
    <div
      className={`popup ${addClass} ${active ? 'active' : ''}`}
      onClick={closePopup}>
      <div className={`popup__inner ${active ? 'active' : ''}`}>{children}</div>
    </div>,
    document.getElementById('popups')
  );
};

export default Popup;
