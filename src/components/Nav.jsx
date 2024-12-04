import React from 'react';

export const NAV_ITEMS = {
  PREHYSTORIC: {
    icon: 'ic1.png',
    iconActive: 'ic1-active.png',
  },
  DYNASTY: {
    icon: 'ic2.png',
    iconActive: 'ic2-active.png',
  },
  EGYPT: {
    icon: 'ic3.png',
    iconActive: 'ic3-active.png',
  },
  WW2: {
    icon: 'ic4.png',
    iconActive: 'ic4-active.png',
  },
  NYC: {
    icon: 'ic5.png',
    iconActive: 'ic5-active.png',
  },
};
const imagesURL = '/images/components/';

const Nav = ({ children }) => {
  return (
    <div className="nav">
      <div className="nav__inner">{children}</div>
    </div>
  );
};

export const NavItem = ({ type = NAV_ITEMS[0], onClick, active }) => {
  return (
    <button
      className={`nav-item ${active ? 'active' : ''}`}
      type="button"
      onClick={onClick}>
      <img
        src={imagesURL + 'tab.png'}
        alt="button-bg"
        className="nav-item-bg"
      />
      <img src={imagesURL + type.icon} alt="icon" className="nav-item-icon" />
      <img
        src={imagesURL + type.iconActive}
        alt="icon-active"
        className="nav-item-iconactive"
      />
    </button>
  );
};

export const NavArrow = ({ next = false, prev = false, ...props }) => {
  let addClass = '';
  addClass += next ? '_next' : '';
  addClass += prev ? '_prev' : '';
  
  return (
    <button type="button" className={`nav-arrow ${addClass}`} {...props}>
      {prev && <img src="/images/components/prev.png" alt="prev" />}
      {next && <img src="/images/components/next.png" alt="next" />}
    </button>
  );
};
export default Nav;
