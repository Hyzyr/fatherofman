import { promiseLoadImage } from '@/utils/fetch';
import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

const PopupCanvas = (
  {
    textColor = '#ff0000',
    instaStyle,
    fontSize = 18,
    manualText,
    setManualText,
    image,
  },
  ref
) => {
  const [width, setWidth] = useState(0);
  //   const ref = useRef();
  const rndRef = useRef(null);

  const [imgPosition, setImgPosition] = useState({});
  const [textPosition, setTextPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  });

  const updateImagePos = (newState) => {
    setImgPosition((oldState) => ({ ...oldState, ...newState }));
  };
  useEffect(() => {
    if (!ref.current) return 0;
    let imgHeight = ref.current.clientHeight;
    setWidth(instaStyle ? (9 / 16) * imgHeight : imgHeight);
  }, [instaStyle]);
  useEffect(() => {
    if (!image) return;

    promiseLoadImage(image).then((img) => {
      if (!img?.width) return;
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;

      // Calculate the scaling factor to fit the image within the wrapper
      const scaleFactor = Math.min(
        ref.current.clientWidth / imageWidth,
        ref.current.clientHeight / imageHeight
      ).toFixed(3);
      console.log({
        refclientWidth: ref.current.clientWidth,
        refclientHeight: ref.current.clientHeight,
        imageWidth,
        imageHeight,
      });
      console.log({
        top: 0,
        left: 0,
        width: `${imageWidth * scaleFactor}px`,
        height: `${imageHeight * scaleFactor}px`,
      });
      updateImagePos({
        top: 10,
        left: 10,
        width: `${imageWidth * scaleFactor}px`,
        height: `${imageHeight * scaleFactor}px`,
      });
      window.img = img;
      console.log(img);
    });
  }, [image]);

  return (
    <div className="popupEditor__canvas" ref={ref} style={{ width: width }}>
      <span className="space">
        <img src="/images/components/white-screen.webp" alt="white-screen" />
      </span>
      {image && (
        <Rnd
          ref={rndRef}
          bounds="parent"
          size={{
            width: imgPosition.width ?? '100%',
            height: imgPosition.height ?? '100%',
          }}
          position={{ x: imgPosition.x ?? 0, y: imgPosition.y ?? 0 }}
          onDragStop={(e, d) =>
            setImgPosition((prev) => ({ ...prev, x: d.x, y: d.y }))
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            setImgPosition({
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
          }}>
          <img src={image} alt="Photo Card Big" />
        </Rnd>
      )}

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
        }}>
        <textarea
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          style={{ color: textColor, fontSize: `${fontSize}px` }}
          placeholder="Enter your text here..."
        />
      </Rnd>
    </div>
  );
};

export default React.forwardRef(PopupCanvas);
