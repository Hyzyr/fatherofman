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
  const helperRef = useRef(null);
  useGSAP(
    () => {
      const imgWrapper = ref.current.querySelector('.cursor__img');

      const mousemove = (event) => {
        gsap.to(helperRef.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.45,
          ease: 'Power4.out',
        });
        gsap.to(ref.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.1,
        });
      };
      const updateText = () => {
        gsap.set('.helper-text', {
          innerText: HELPER_TEXTS[getRandomToN(HELPER_TEXTS.length)],
        });
      };
      const onClick = () =>
        imgWrapper?.classList && imgWrapper.classList.add('clicked');
      const onRelase = () =>
        imgWrapper?.classList && imgWrapper.classList.remove('clicked');

      document.addEventListener('mousedown', onClick);
      document.addEventListener('mouseup', onRelase);
      document.addEventListener('mousemove', mousemove);
      const interval = setInterval(updateText, 2200);
      return () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mousedown', onClick);
        document.removeEventListener('mouseup', onRelase);
        clearInterval(interval);
      };
    },
    {
      scope: ref,
    }
  );

  return createPortal(
    <>
      <div className="cursor" ref={ref}>
        <div className="cursor__img">
          <img src="/images/cursor/select-cursor-new.png" alt="" />
          <img src="/images/cursor/clicked-cursor-new.png" alt="" />
        </div>
      </div>
      <div className="cursorhelper" ref={helperRef}>
        <div className="cursorhelper-text">My Child</div>
        <div className="cursorhelper-img">
          <img
            src="/images/cursor/cursor-helper/following-cursor-normal.png"
            alt="cursor-helper"
          />
        </div>
      </div>
    </>,
    document.getElementById('popups')
  );
};
export const Cursor = () => {
  return <></>;
};

export default CursorHelper;
