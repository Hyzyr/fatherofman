import React, { useEffect, useRef } from 'react';

const SceneWrapper = ({ active, children }) => {
  const wrapper = useRef(null);



  return (
    <div
      className={`sceneController__scene ${active ? 'active' : ''}`}
      ref={wrapper}>
      {children}
      <div className={`sceneController__scene-fog`}></div>
    </div>
  );
};

export default SceneWrapper;
