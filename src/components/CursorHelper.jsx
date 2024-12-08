import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { getRandomToN } from '@/utils/random';
import { createPortal } from 'react-dom';

const HELPER_TEXTS = [
  "Don't fade your ancestor",
  'HIM always watching ',
  'There is him in you',
  'My child...',
  "Who's your daddy",
];

const CursorHelper = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mousemove = (event) => {
        gsap.set(ref.current, {
          x: event.clientX,
          y: event.clientY,
        });
      };
      const updateText = () => {
        gsap.set('.helper-text', {
          innerText: HELPER_TEXTS[getRandomToN(HELPER_TEXTS.length)],
        });
      };
      document.addEventListener('mousemove', mousemove);
      const interval = setInterval(updateText, 2200);
      return () => {
        document.removeEventListener('mousemove', mousemove);
        clearInterval(interval);
      };
    },
    {
      scope: ref,
    }
  );

  return createPortal(
    <div className="helper" ref={ref}>
      <div className="helper-text">My Child</div>
      <div className="helper-img">
        <img
          src="/images/cursor/cursor-helper/following-cursor-normal.png"
          alt="cursor-helper"
        />
      </div>
    </div>,
    document.getElementById('popups')
  );
};

export default CursorHelper;
