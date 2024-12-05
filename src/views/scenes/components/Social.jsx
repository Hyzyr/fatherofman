import React from 'react';

const Social = () => {
  return (
    <div className="social">
      <div className="social__links">
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/dex.webp " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/insta.webp " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/x_twitter.webp " alt="" />
        </button>
        <button type="button" className="social-link">
          <img src="/images/components/social-icons/tiktok.webp" alt="" />
        </button>
        <button type="button" className="social-link">
          <img
            src="/images/components/social-icons/telegram gold.webp "
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Social;
