'use client';

import Preloader from '@/views/preloader/PreloaderScreen';
import AScenes from '@/views/scenes/AScenes';
import Dynasty from '@/views/scenes/Dynasty';
import Egypt from '@/views/scenes/Egypt';
import NYC from '@/views/scenes/NYC';
import Prehystoric from '@/views/scenes/Prehystoric';
import WW2 from '@/views/scenes/WW2';

export default function Home() {
  return <AScenes animated={false} />;
}
