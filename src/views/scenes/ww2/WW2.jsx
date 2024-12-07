import React, { useRef, useState } from 'react';
import WW2Scene from './WW2Scene';
import PopupWW2 from './PopupWW2';

const WW2 = (props) => {
  const ref = useRef();
  const [popup, setPopup] = useState(false);

  return (
    <div className="test" ref={ref}>
      <WW2Scene {...props} onCharClick={() => setPopup(true)} />
      <PopupWW2
        active={popup}
        addClass={'popup--ww2'}
        close={() => setPopup(false)}
      />
    </div>
  );
};

export default WW2;
