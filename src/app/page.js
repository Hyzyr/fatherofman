'use client';

import { AllAssetFiles } from '@/contants/Assets';
import useAssetLoader from '@/hooks/useAssetLoader';
import Popup from '@/views/preloader/Popup';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import { useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(false);
  const { loaded, progress } = useAssetLoader({ assets: AllAssetFiles });

  return <AScenes />;
  return (
    <>
      {!granted && <Preloader progress={progress} />}
      {granted && <AScenes />}
      {loaded && !granted && (
        <Popup
          onConfirm={() => setGranted(true)}
          onCancel={() => setGranted(false)}
        />
      )}
    </>
  );
}
