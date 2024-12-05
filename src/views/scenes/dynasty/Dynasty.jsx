import React, { useState } from 'react';
import DynastyScene from './DynastyScene';
import PopupDynasty from './PopupDynasty';

const Dynasty = ({ animated }) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <DynastyScene animated={animated} onCharClick={() => setPopup(true)} />
      <PopupDynasty
        active={popup}
        addClass={'popup--dynasty'}
        close={() => setPopup(false)}
      />
    </>
  );
};

export default Dynasty;
