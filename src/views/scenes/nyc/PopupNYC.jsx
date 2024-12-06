import Popup from '@/components/Popup';
import React from 'react';

const PopupEgypt = (props) => {
  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        <img src="/images/components/nyc/ipad_1.webp" alt="stone" />
      </div>
      <div className="popup__inner-content"></div>
    </Popup>
  );
};

export default PopupEgypt;