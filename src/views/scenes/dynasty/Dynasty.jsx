import React, { useRef, useState } from 'react';
import DynastyScene from './DynastyScene';
import PopupDynasty from './PopupDynasty';
import useSounds from '@/hooks/useSounds';
import gsap from 'gsap';

const getBgMusic = () => {
  if (typeof window === 'undefined') return;
  return document.querySelector('.muteButton audio');
};

const Dynasty = ({ animated }) => {
  const [popup, setPopup] = useState(false);
  const isPlaying = useRef(false);
  const { playSound } = useSounds();

  const onCharClick = async () => {
    if (isPlaying.current) return;
    isPlaying.current = true;

    let url = `/sounds/dynasty-sound.mp3`;
    const audioBg = getBgMusic();

    setPopup(true);

    if (audioBg) {
      let duration = 5;
      let sound = await playSound(url);
      duration = sound?.buffer?.duration;

      gsap
        .timeline()
        .to(audioBg, {
          volume: 0.1,
          duration: 0.4,
          onComplete: () => {
            if (sound?.start) {
              try {
                sound.start();
              } catch (err) {}
            }
          },
        })
        .to({}, { duration })
        .to(audioBg, {
          volume: 1,
          duration: 0.5,
          onComplete: () => {
            isPlaying.current = false;
          },
        });
    } else playSound(url);
  };

  return (
    <>
      <DynastyScene animated={animated} onCharClick={onCharClick} />
      {animated && (
        <PopupDynasty
          active={popup}
          addClass={'popup--dynasty'}
          close={() => {
            setPopup(false);
          }}
        />
      )}
    </>
  );
};

export default Dynasty;
