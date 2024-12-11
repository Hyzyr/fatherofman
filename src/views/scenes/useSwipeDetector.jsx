import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const checkIfChildOfPopup = (targetEl) => {
  let contains = false;

  document.querySelectorAll('.popup').forEach(function (popup) {
    contains = popup.contains(targetEl) ? true : contains;
  });
  console.log('is popup child : ', contains);
  return contains;
};

const useSwipeDetector = ({ onSwipeLeft, onSwipeRight }) => {
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const setTouchStart = (value) => (touchStartRef.current = value);
  const setTouchEnd = (value) => (touchEndRef.current = value);

  const handleTouchStart = React.useCallback((e) => {
    if (checkIfChildOfPopup(e.target)) return;
    setTouchStart(e.targetTouches[0].clientX);
  });

  const handleTouchMove = React.useCallback((e) => {
    if (checkIfChildOfPopup(e.target)) return;
    setTouchEnd(e.targetTouches[0].clientX);
  });

  const handleTouchEnd = React.useCallback(
    (e) => {
      if (checkIfChildOfPopup(e.target)) return;
      const touchStart = touchStartRef.current;
      const touchEnd = touchEndRef.current;
      if (touchStartRef && touchEnd) {
        const distance = touchStart - touchEnd;
        if (distance > 50) {
          console.log('onSwipeRight');
          onSwipeRight();
        } else if (distance < -50) {
          console.log('onSwipeLeft');
          onSwipeLeft();
        }
      }
      setTouchStart(null);
      setTouchEnd(null);
    },
    [onSwipeLeft, onSwipeRight]
  );

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchEnd]);
};

export default useSwipeDetector;
