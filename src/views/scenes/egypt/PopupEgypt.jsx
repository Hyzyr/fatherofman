import Popup from '@/components/Popup';
import useMobile from '@/hooks/useMobile';
import React from 'react';

const PopupEgypt = (props) => {
  const isMobile = useMobile();
  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        {!isMobile && (
          <img src="/images/components/egypt/popup-tablet.webp" alt="stone" />
        )}
        {isMobile && (
          <img src="/images/components/egypt/stone_tab.webp" alt="stone" />
        )}
      </div>
      <div className="popup__inner-content"></div>
    </Popup>
  );
};

export default PopupEgypt;
