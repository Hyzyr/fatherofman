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
          <img src="/images/components/textbox-website.png" alt="textbox-bg" />
        </div>
      </div>
    </div>
  );
};

export default DropBox;
