import React, { useState } from 'react';

const mainText = 'Coming soon';

const CopyBar = () => {
  const timeout = React.useRef(null);
  const [copied, setCopied] = useState(false);

  const toggleCopied = () => {
    if (timeout.current) clearTimeout(timeout.current);
    else setCopied(true);
    timeout.current = setTimeout(() => {
      setCopied(false);
      timeout.current = null;
    }, 3000);
  };

  return (
    <div className={`copybar`} onClick={toggleCopied}>
      <div className="copybar-bg">
        <img src="/images/components/textbox_long.webp" alt="textbox-bg" />
        <img
          src="/images/components/copy-ico.png"
          className="_copy"
          alt="copy"
        />
      </div>
      <div className="copybar-text">
        {!copied && <span>{mainText}</span>}
        {copied && <span>Copied !</span>}
      </div>
    </div>
  );
};

export default CopyBar;
