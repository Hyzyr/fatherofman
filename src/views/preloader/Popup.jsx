import React from 'react';
import Button from '@/components/Button';

const Popup = () => {
  return (
    <div className="popup">
      <div className="popup__inner">
        <div className="popup__inner-bg">
          <img src="/images/components/confirm-popup.webp" alt="background" />
        </div>
        <div className="popup__inner-content">
          <p>Are you ready to meet your Ancestor?</p>
          <div className="popup__inner-actions">
            <div className="popup__inner-actions-bg">
              <img
                src="/images/components/confirm-popup-buttons-row.webp"
                alt="background"
              />
            </div>
            <div className="popup__inner-actions-row">
              <Button text="Yes" />
              <Button text="No" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
