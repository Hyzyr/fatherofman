'use client';

import CursorHelper from '@/components/CursorHelper';
import { AllAssetFiles } from '@/contants/Assets';
import useAssetLoader from '@/hooks/useAssetLoader';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import { useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(false);
  const { loaded, progress } = useAssetLoader({ assets: AllAssetFiles });

  return (
    <>
      {!granted && (
        <Preloader
          completed={loaded}
          progress={progress}
          setGranted={setGranted}
        />
      )}
      {granted && <AScenes />}
      <CursorHelper />
    </>
  );
}
