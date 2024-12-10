import React, { useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 940);
  }, []);
  return isMobile;
};

export default useMobile;
