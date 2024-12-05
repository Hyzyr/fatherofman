import React from 'react';
import Button from '@/components/Button';
import Popup from '../../components/Popup';

const PreloaderPopup = ({ onConfirm, onCancel }) => {
  return (
    <Popup active>
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
            <Button text="Yes" onClick={onConfirm} />
            <Button text="No" onClick={onCancel} />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PreloaderPopup;
