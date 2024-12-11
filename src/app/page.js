'use client';

import CursorHelper from '@/components/CursorHelper';
import { AllAssetFiles } from '@/contants/Assets';
import useAssetLoader from '@/hooks/useAssetLoader';
import useMobile from '@/hooks/useMobile';
import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import Dynasty from '@/views/scenes/dynasty/Dynasty';
import Egypt from '@/views/scenes/egypt/Egypt';
import NYC from '@/views/scenes/nyc/NYC';
import WW2 from '@/views/scenes/ww2/WW2';
import { useEffect, useState } from 'react';

export default function Home() {
  const [granted, setGranted] = useState(true);
  const [ready, setReady] = useState(false);
  const { loaded, attached, progress } = useAssetLoader({
    assets: AllAssetFiles,
  });
  const isMobile = useMobile();
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;

  // return <AScenes animated={false} />;

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
