import React from 'react';
import Popup from '@/components/Popup';

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
              <li>To Ape is the essence of Him</li>
              <li>
                To fade one's ancestors is to ensure one’s own self destruction
              </li>
              <li>Before Man, came HIM. Before liquidity came the swim</li>
              <li>One should elect HIM regardless of one's personal gender</li>
              <li>He will win, he who knows what to shill and what to FUD</li>
              <li>If the fudder has a temper, irritate them by apeing</li>
              <li>If a pump is near, make them believe it is distant</li>
              <li>
                In times of FUD, shill the Father of Man, and one's own
                ancestry, unifier of humanity - HIM
              </li>
            </ul>
          </div>
          <div className="popup__inner-dynasty-col">
            <ul>
              <li>
                He who knows when to ape and when to hold shall find eternal
                bliss & tranquility
              </li>
              <li>
                If you know the FUD and know HIM need not fear the results of
                one hundred jeets
              </li>
              <li>
                The supreme art of Him is to APE first and thank HIM second
              </li>
              <li>In times of darkness, encourage FUD and pretend CTO</li>
              <li>He will cook, HIM with the diamond hands</li>
              <li>Supreme excellence is to sweat for the bags of HIMself</li>
            </ul>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupDynasty;
