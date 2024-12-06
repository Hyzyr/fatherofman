import React, { useState } from 'react';
import NYCScene from './NYCScene';

const NYC = ({ animated }) => {
  const [test, settest] = useState(false);
  const [popup, setPopup] = useState(false);

  React.useEffect(() => {
    settest(true);
  }, []);

  if (!test) return null;
  return (
    <>
      <NYCScene animated={animated} onCharClick={() => setPopup(true)} />
        
    </>
  );
};

export default NYC;
