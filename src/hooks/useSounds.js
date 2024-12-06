import React, { useEffect, useRef } from 'react';

async function playBackgroundSound(url, loop) {
  try {
    console.log('play url', url);
    // Fetch the audio file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // Create an AudioContext
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create a buffer source
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop; // Set the loop property to true

    // Connect the source to the context's destination (the speakers)
    source.connect(audioContext.destination);

    // Play the sound
    source.start();
    return source;
  } catch (error) {
    console.log('Error playing sound:', error);
    return null;
  }
}

const useSounds = ({ url, loop = false } = {}) => {
  const ref = useRef();
  useEffect(() => {
    if (url) ref.current = playBackgroundSound(url, loop);
  }, [url]);

  const playSound = (url, loop) => {
    ref.current = playBackgroundSound(url, loop);
  };

  return { playSound, ref };
};

export default useSounds;
