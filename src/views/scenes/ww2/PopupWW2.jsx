import Popup from '@/components/Popup';
import React, { useState } from 'react';
import { memorabiliaImages, randomTextList } from './contants';
import ColorPiker from '../components/ColorPiker';
import PopupCanvas from './PopupCanvas';
import { getRandomToN } from '@/utils/random';

let getRandomText = () => {
  let index = getRandomToN(randomTextList.length);
  return randomTextList[index];
};
let randomN = getRandomText();

const PopupWW2 = (props) => {
  const [instaStyle, setInstaStyle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textColor, setTextColor] = useState('#ff0000');
  const [manualText, setManualText] = useState(getRandomText());

  const randomText = () => setManualText(getRandomText());

  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        <img
          src="/images/components/ww2/journal-without-textbox.webp"
          alt="journal"
        />
      </div>
      <div className="popup__inner-journal">
        <div className="popup__inner-journal-column">
          <div className="popupEditor">
            <h3>Him's Journal</h3>
            <div className="popupEditor__actions">
              <button
                className="popupEditor__actions-btn"
                type="button"
                onClick={() => setInstaStyle(false)}>
                <img src="/images/components/ww2/1-1.png" alt="1X1" />
              </button>
              <button
                className="popupEditor__actions-btn"
                type="button"
                onClick={() => setInstaStyle(true)}>
                <img src="/images/components/ww2/9-16.png" alt="1X1" />
              </button>
              {/* <button className="popupEditor__actions-btn" type="button">
                <img src="/images/components/ww2/1-1.png" alt="1X1" />
              </button> */}
              <ColorPiker currentColor={textColor} onChange={setTextColor} />
            </div>
            <PopupCanvas
              instaStyle={instaStyle}
              textColor={textColor}
              manualText={manualText}
              setManualText={setManualText}
              image={`/images/journal/${selectedImage?.image}`}
            />

            <div className="popupEditor__range"></div>
            <div className="popupEditor__footer">
              <button className="textbutton" onClick={() => randomText()}>
                Randomize
              </button>
            </div>
          </div>
        </div>
        <div className="popup__inner-journal-column">
          <div className="popupEditor">
            <h3>Memorabilia</h3>
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
