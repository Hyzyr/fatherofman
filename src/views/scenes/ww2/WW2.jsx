import React, { useState } from 'react';
import WW2Scene from './WW2Scene';
import PopupWW2 from './PopupWW2';

const WW2 = (props) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <WW2Scene {...props} onCharClick={() => setPopup(true)} />
      <PopupWW2
        active={popup}
        addClass={'popup--ww2'}
        close={() => setPopup(false)}
      />
    </>
  );
};

export default WW2;
