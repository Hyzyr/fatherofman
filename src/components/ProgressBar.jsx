import React from 'react';

const ProgressBar = () => {
  const percentage = 15;
  return (
    <span className="progressbar">
      <span
        className="progressbar-line"
        style={{
          width: `${percentage}%`,
        }}></span>
      <span className="progressbar-text">{`${percentage}%`}</span>
    </span>
  );
};

export default ProgressBar;
