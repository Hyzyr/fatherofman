import React, { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 940);
    const listener = () => setIsMobile(window.innerWidth < 940);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  return isMobile;
};

export default useMobile;
