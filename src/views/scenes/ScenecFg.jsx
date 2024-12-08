import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ScenecFg = () => {
  let wrapper = useRef();
  //   useEffect(() => {
  //     const wrapperEl = wrapper.current;
  //     wrapper.querySelectorAll('img').forEach((img) => {
  //         // img.style.height
  //     });
  //   }, []);

  useGSAP(
    () => {
      if (!wrapper.current) return;
      const items = wrapper.current.querySelectorAll('._emptyspace, img');
      console.log({ width: window.innerWidth * items.length });
      gsap.set(items, {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      gsap.set(wrapper.current, {
        width: window.innerWidth * items.length,
        x: 0,
      });
    },
    {
      scope: wrapper,
    }
  );
  return (
    <div className="sceneController__track-fg" ref={wrapper}>
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-1-to-2.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-2-to-3.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-3-to-4.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-4-to-5.webp" alt="scene-midd-siluate" />
    </div>
  );
};

export default ScenecFg;
