import React, { useState } from 'react';
import NYCScene from './NYCScene';
import PopupNYC from './PopupNYC';

const NYC = ({ animated }) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <NYCScene animated={animated} onCharClick={() => setPopup(true)} />
      {animated && (
        <PopupNYC
          active={popup}
          addClass={'popup--nyc'}
          close={() => setPopup(false)}
        />
      )}
    </>
  );
};

export default NYC;
