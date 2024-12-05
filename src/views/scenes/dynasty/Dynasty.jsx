import React, { useRef } from 'react';
import DynastyScene from './DynastyScene';


const Dynasty = ({ animated }) => {


  return <DynastyScene animated={animated} onCharClick={onCharClick} />;
};

export default Dynasty;
