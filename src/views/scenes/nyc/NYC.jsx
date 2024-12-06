import React, { useState } from 'react';
import NYCScene from './NYCScene';

const NYC = ({ animated }) => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <NYCScene animated={animated} onCharClick={() => setPopup(true)} />
    </>
  );
};

export default NYC;
