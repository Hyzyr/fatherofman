import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

const PopupCanvas = ({
  textColor = '#ff0000',
  instaStyle,
  fontSize = 18,
  manualText,
  setManualText,
  image,
}) => {
  const rndRef = useRef(null);

  const [textPosition, setTextPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  });

  return (
    <div className="popupEditor__canvas">
      <div
        className="ratioImage"
        style={{
          paddingBottom: instaStyle ? '177.7%' : '100%',
        }}>
        {image ? (
          <img
            src={image}
            alt="Photo Card Big"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="space"></span>
        )}
      </div>
      <Rnd
        ref={rndRef}
        bounds="parent"
        size={{
          width: textPosition.width,
          height: textPosition.height,
        }}
        position={{ x: textPosition.x, y: textPosition.y }}
        onDragStop={(e, d) =>
          setTextPosition((prev) => ({ ...prev, x: d.x, y: d.y }))
        }
        onResizeStop={(e, direction, ref, delta, position) => {
          setTextPosition({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            x: position.x,
            y: position.y,
          });
        }}
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
        }}
        dragHandleClassName="drag-handle"
        className="absolute">
        <textarea
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            lineHeight: '1.2',
            fontWeight: 'bold',
            overflowWrap: 'break-word',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            resize: 'none',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          placeholder="Enter your text here..."
          className="drag-handle"
        />
      </Rnd>
    </div>
  );
};

export default PopupCanvas;
