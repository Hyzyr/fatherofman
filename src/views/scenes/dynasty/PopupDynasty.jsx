import React from 'react';
import Popup from '@/components/Popup';

const list1 = [
  'To Ape is the essence of Him',
  "To fade one's ancestors is to ensure one’s own self destruction",
  'Before Man, came HIM. Before liquidity came the swim',
  "One should elect HIM regardless of one's personal gender",
  'He will win, he who knows what to shill and what to FUD',
  'If the fudder has a temper, irritate them by apeing',
  "In times of FUD, shill the Father of Man, and one's own ancestry, unifier of humanity - HIM",
];
const list2 = [
  'He who knows when to ape and when to hold shall find eternal bliss & tranquility',
  'If you know the FUD and know HIM need not fear the results of one hundred jeets',
  'The supreme art of Him is to APE first and thank HIM second',
  'In times of darkness, encourage FUD and pretend CTO',
  'He will cook, HIM with the diamond hands',
  'Supreme excellence is to sweat for the bags of HIMself',
];

const PopupDynasty = (props) => {
  return (
    <Popup {...props}>
      <div className="popup__inner-bg">
        <img
          src="/images/components/dynasty/mob-scroll.webp"
          className="_mob"
          alt="stone"
        />
        <img
          src="/images/components/dynasty/new-scroll.webp"
          className="_desktop"
          alt="stone"
        />
      </div>
      <div className="popup__inner-dynasty">
        <div className="popup__inner-dynasty-row">
          <div className="popup__inner-dynasty-col">
            <ul>
              {list1.map((text, index) => (
                <li key={index}>
                  <span className="num">{index + 1}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="popup__inner-dynasty-col">
            <ul>
              {list2.map((text, index) => (
                <li key={index}>
                  <span className="num">{index + list1.length + 1}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupDynasty;
