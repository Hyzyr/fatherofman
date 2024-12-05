import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
const ColorPiker = ({ currentColor, onChange }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  return (
    <div className="colorPiker">
      <span className="colorPiker-title">
        Text <br />
        Color
      </span>
      <span
        className="colorPiker-color"
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        style={{ background: currentColor }}></span>
      {isColorPickerOpen && (
        <div className="colorPiker-picker">
          <HexColorPicker color={currentColor} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPiker;
