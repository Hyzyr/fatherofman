import Popup from '@/components/Popup';
import React, { useRef, useState } from 'react';
import { memorabiliaImages, randomTextList } from './contants';
import ColorPiker from '../components/ColorPiker';
import PopupCanvas from './PopupCanvas';
import { getRandomToN } from '@/utils/random';
import InputRange from '@/components/InputRange';
import useExportImg from './useExportImg';
import useMobile from '@/hooks/useMobile';

let getRandomText = () => {
  let index = getRandomToN(randomTextList.length);
  return randomTextList[index];
};

const PopupWW2 = (props) => {
  const [instaStyle, setInstaStyle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textColor, setTextColor] = useState('#fff');
  const [manualText, setManualText] = useState(getRandomText());
  const [fontSize, setFontSize] = useState(18);
  const isMobile = useMobile();

  const exportEl = useRef(null);

  const randomText = () => setManualText(getRandomText());
  const handleFontSize = (e) => {
    setFontSize(e.target.value);
  };
  const { exportCanvasAsImage } = useExportImg({ wrapper: exportEl });

  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        {!isMobile && (
          <img
            src="/images/components/ww2/journal-without-textbox.webp"
            alt="journal"
          />
        )}
        {isMobile && (
          <img
            src="/images/components/ww2/journal-without-textbox-half.webp"
            alt="journal"
          />
        )}
      </div>
      <div className="popup__inner-journal">
        <div className="popup__inner-journal-column">
          <div className="popupEditor">
            <h3>{"Him's Journal"}</h3>
            <div className="popupEditor__actions">
              <button
                className="popupEditor__actions-btn"
                type="button"
                onClick={() => setInstaStyle(false)}>
                <img src="/images/components/ww2/1-1.webp" alt="1X1" />
              </button>
              <button
                className="popupEditor__actions-btn"
                type="button"
                onClick={() => setInstaStyle(true)}>
                <img src="/images/components/ww2/9-16.webp" alt="1X1" />
              </button>
              <ColorPiker currentColor={textColor} onChange={setTextColor} />
            </div>
            <PopupCanvas
              ref={exportEl}
              instaStyle={instaStyle}
              textColor={textColor}
              manualText={manualText}
              fontSize={fontSize}
              setManualText={setManualText}
              image={
                selectedImage ? `/images/journal/${selectedImage?.image}` : null
              }
            />
            <div className="popupEditor__range">
              <span className="_small">A</span>
              <InputRange value={fontSize} onChange={handleFontSize} />
              <span className="_big">A</span>
            </div>
            <div className="popupEditor__footer">
              <button className="buttonText" onClick={() => randomText()}>
                Randomize
              </button>
              <button
                className="buttonText"
                onClick={() => exportCanvasAsImage()}>
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="popup__inner-journal-column">
          <div className="popupEditor _nogap">
            {!isMobile && <h3>Memorabilia</h3>}
            <div className="popupEditor__list">
              {memorabiliaImages.map((imgData) => (
                <div
                  key={imgData.image}
                  className="popupEditor__list-thumb"
                  onClick={() => setSelectedImage(imgData)}
                  style={{ rotate: `${imgData.degree}deg` }}>
                  <img src={`/images/journal/thumb/${imgData.thumb}`} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupWW2;
