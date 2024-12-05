import React, { useRef } from 'react';
import PrehystoricScene from './PrehystoricScene';
import useSounds from '@/hooks/useSounds';
import { getRandomToN } from '@/utils/random';
import { VOICE_LIST } from './contstants';

const Prehystoric = ({ animated }) => {
  const index = useRef(null);
  const { playSound } = useSounds();

  const onCharClick = () => {
    let newIndex = getRandomToN(VOICE_LIST.length, index.current);
    index.current = newIndex;
    let url = `/voice-over/${VOICE_LIST[newIndex]}`;
    playSound(url);
  };

  return <PrehystoricScene animated={animated} onCharClick={onCharClick} />;
};

export default Prehystoric;
