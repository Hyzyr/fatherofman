import React, { useState } from 'react';

const MuteButton = () => {
  const [mute, setMute] = useState(false);
  const audio = React.useRef(null);
  const toggleMute = () => {
    if (audio.current) !mute ? audio.current.pause() : audio.current.play();
    setMute(!mute);
  };

  return (
    <div
      className={`muteButton ${mute ? '_off' : ''}`}
      onClick={() => toggleMute()}>
      <img src="/images/components/speaker-on.webp" alt="speaker-on" />
      <img src="/images/components/speaker-off.webp" alt="speaker-off" />
      <audio
        src="/sounds/bg-sound.mp3"
        ref={audio}
        autoPlay={!mute}
        loop></audio>
    </div>
  );
};

export default MuteButton;
