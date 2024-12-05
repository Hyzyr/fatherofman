import React from 'react';

export const NAV_ITEMS = {
  PREHYSTORIC: {
    icon: 'ic1.webp',
    iconActive: 'ic1-active.webp',
  },
  DYNASTY: {
    icon: 'ic2.webp',
    iconActive: 'ic2-active.webp',
  },
  EGYPT: {
    icon: 'ic3.webp',
    iconActive: 'ic3-active.webp',
  },
  WW2: {
    icon: 'ic4.webp',
    iconActive: 'ic4-active.webp',
  },
  NYC: {
    icon: 'ic5.webp',
    iconActive: 'ic5-active.webp',
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
        src={imagesURL + 'tab.webp'}
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
      {prev && <img src="/images/components/prev.webp" alt="prev" />}
      {next && <img src="/images/components/next.webp" alt="next" />}
    </button>
  );
};
export default Nav;
