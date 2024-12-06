import React, { useRef } from 'react';
import PrehystoricScene from './PrehystoricScene';
import useSounds from '@/hooks/useSounds';
import { getRandomToN } from '@/utils/random';
import { VOICE_LIST } from './contstants';

import gsap from 'gsap';

const getBgMusic = () => {
  if (typeof window === 'undefined') return;
  return document.querySelector('.muteButton audio');
};

const Prehystoric = ({ animated }) => {
  const index = useRef(null);
  const { playSound } = useSounds();

  const onCharClick = async () => {
    let newIndex = getRandomToN(VOICE_LIST.length, index.current);
    index.current = newIndex;
    let url = `/voice-over/${VOICE_LIST[newIndex]}`;
    const audioBg = getBgMusic();

    if (audioBg) {
      console.log(audioBg, 'audioBg');
      let duration = 5;
      let sound = await playSound(url);
      duration = sound?.buffer?.duration;

      gsap
        .timeline()
        .to(audioBg, {
          volume: 0,
          duration: 0.4,
          onComplete: () => {
            if (sound?.start) sound.start();
          },
        })
        .to({}, { duration })
        .to(audioBg, { volume: 1, duration: 0.5 });
    } else playSound(url);
  };

  return <PrehystoricScene animated={animated} onCharClick={onCharClick} />;
};

export default Prehystoric;
