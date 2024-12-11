import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const useSwipeDetector = ({ onSwipeLeft, onSwipeRight }) => {
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const touchStart = touchStartRef.current;
  const touchEnd = touchEndRef.current;

  const setTouchStart = (value) => (touchStartRef.current = value);
  const setTouchEnd = (value) => (touchEndRef.current = value);
  
  const handleTouchStart = React.useCallback((e) => {
    console.log('touch')
    setTouchStart(e.targetTouches[0].clientX);
  });

  const handleTouchMove = React.useCallback((e) => {
    console.log('touch move')
    setTouchEnd(e.targetTouches[0].clientX);
  });

  const handleTouchEnd = React.useCallback(() => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;   
    if (touchStartRef && touchEnd) {
      const distance = touchStart - touchEnd;
      if (distance > 50) {
        console.log('Swiped left');
        onSwipeLeft();
        // Trigger function to change slider to the left
      } else if (distance < -50) {
        console.log('Swiped right');
        onSwipeRight();
        // Trigger function to change slider to the right
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  });

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
};

export default useSwipeDetector;
