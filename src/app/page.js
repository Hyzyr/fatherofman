'use client';

import CursorHelper from '@/components/CursorHelper';
import useAssetLoader from '@/hooks/useAssetLoader';
import useMobile from '@/hooks/useMobile';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import { useEffect, useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(false);
  const [ready, setReady] = useState(false);
  const { loaded, attached, progress } = useAssetLoader();
  const isMobile = useMobile();
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;

  return (
    <>
      {loaded && <AScenes active={granted} />}
      {!isMobile && <CursorHelper />}
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
