import React, { useState } from 'react';
import EgyptScene from './EgyptScene';
import PopupEgypt from './PopupEgypt';

const Egypt = ({ animated }) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <EgyptScene animated={animated} onCharClick={() => setPopup(true)} />
      {animated && (
        <PopupEgypt
          active={popup}
          addClass={'popup--egypt'}
          close={() => setPopup(false)}
        />
      )}
    </>
  );
};

export default Egypt;
