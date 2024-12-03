import React from 'react';

const Button = ({ text, children, ...props }) => {
  return (
    <button type="button" className="button" {...props}>
      <span className="button-bg">
        <img src="/images/components/button-bg.webp" alt="button" />
      </span>
      {text && <span>{text}</span>}
      {children && children}
    </button>
  );
};

export default Button;
