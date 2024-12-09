'use client';

import CursorHelper from '@/components/CursorHelper';
import { AllAssetFiles } from '@/contants/Assets';
import useAssetLoader from '@/hooks/useAssetLoader';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import { useEffect, useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(false);
  const [ready, setReady] = useState(false);
  const { loaded, attached, progress } = useAssetLoader({
    assets: AllAssetFiles,
  });

  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;

  return (
    <>
      {loaded && <AScenes active={granted} />}
      <CursorHelper />
      {!granted && (
        <Preloader
          completed={loaded && attached}
          progress={progress}
          setGranted={setGranted}
        />
      )}
    </>
  );
}
