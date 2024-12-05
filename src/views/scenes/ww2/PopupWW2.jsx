import Popup from '@/components/Popup';
import React from 'react';

const PopupWW2 = (props) => {
  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        <img
          src="/images/components/ww2/journal-without-textbox.webp"
          alt="journal"
        />
      </div>
      <div className="popup__inner-journal">
        <div className="popup__inner-journal-editor">
          
        </div>
        <div className="popup__inner-journal-list"></div>
      </div>
    </Popup>
  );
};

export default PopupWW2;
