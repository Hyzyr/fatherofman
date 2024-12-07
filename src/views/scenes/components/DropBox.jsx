import React, { useState } from 'react';

const DropBox = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`dropbox ${active ? 'active' : ''}`}>
      <button className="dropbox-toggle" onClick={() => setActive(!active)}>
        <img
          src="/images/components/minimize.webp"
          alt="minimize"
          style={{ opacity: active ? 1 : 0 }}
        />
        <img
          src="/images/components/maximize.webp"
          alt="maximize"
          style={{ opacity: !active ? 1 : 0 }}
        />
      </button>
      <div className="dropbox__inner">
        <div className="dropbox__inner-bg">
          <img
            src="/images/components/textbox/low-opacity-bg.webp"
            className="_bg"
            alt="textbox-bg"
          />
          <img
            src="/images/components/textbox/symbol_hd.webp"
            className="_shape"
            alt="textbox-bg"
          />
          <span className="border-v border-l"></span>
          <span className="border-v border-r"></span>
          <span className="border-h border-t"></span>
          <span className="border-h border-b"></span>
        </div>
      </div>
    </div>
  );
};

export default DropBox;
