import React from 'react';

const InputRange = ({ ...props }) => {
  return (
    <div className="inputRange">
      <input type="range" {...props} />
    </div>
  );
};

export default InputRange;
