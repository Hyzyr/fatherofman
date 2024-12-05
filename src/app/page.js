'use client';

import CursorHelper from '@/components/CursorHelper';
import { AllAssetFiles } from '@/contants/Assets';
import useAssetLoader from '@/hooks/useAssetLoader';
import useSounds from '@/hooks/useSounds';
import Popup from '@/views/preloader/PreloaderPopup';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import WW2 from '@/views/scenes/ww2/WW2';
import { useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(false);
  const { loaded, progress } = useAssetLoader({ assets: AllAssetFiles });
  const [error, setError] = useState(false);

  const { playSound } = useSounds();

  const showError = () => {
    setError(true);
    playSound('');
    setTimeout(() => setError(false), 2000);
  };

  return <WW2 animated />;
  return (
    <>
      {!granted && (
        <Preloader completed={loaded} error={error} progress={progress} />
      )}
      {granted && <AScenes />}
      {loaded && !granted && (
        <Popup
          onConfirm={() => setGranted(true)}
          onCancel={() => showError(false)}
        />
      )}
      <CursorHelper />
    </>
  );
}
