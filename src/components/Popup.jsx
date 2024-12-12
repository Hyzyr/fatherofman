import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Popup = ({ active, close, addClass, children }) => {
  const [hydrated, setHydrated] = useState(false);
  const closePopup = (event) => {
    if (event.target === event.currentTarget && close) close();
  };
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !document.getElementById('popups')) return null;

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
