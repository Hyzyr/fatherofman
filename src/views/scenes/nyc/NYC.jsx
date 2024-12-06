import React, { useState } from 'react';
import NYCScene from './NYCScene';
import PopupNYC from './PopupNYC';

const NYC = ({ animated }) => {
  const [test, settest] = useState(false);
  const [popup, setPopup] = useState(true);

  React.useEffect(() => {
    settest(true);
  }, []);

  if (!test) return null;
  return (
    <>
      <NYCScene animated={animated} onCharClick={() => setPopup(true)} />
      <PopupNYC
        active={popup}
        addClass={'popup--nyc'}
        close={() => setPopup(false)}
      />
    </>
  );
};

export default NYC;
