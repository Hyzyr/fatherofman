import React from 'react';

const Social = () => {
  return (
    <div className="social">
      <div className="social__links">
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/dex.png " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/insta.png " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/x_twitter.png " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/tiktok.png" alt="" />
        </button>
        <button type="button" className="social-link">
          <img
            src="/images/components/social-icons/telegram gold.png "
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Social;
