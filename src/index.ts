import subMenu from './subMenu';
import menuFactory from './menuFactory';
import item from './Item';
import './menu.scss';

import { slide as slideStyle, fallDown as fallDownStyle } from './animates';

const components = {
  fallDown: menuFactory(fallDownStyle),
  slide: menuFactory(slideStyle),
};

export const slide = components.slide;
export const fallDown = components.fallDown;
export const SubMenu = subMenu;
export const Item = item;
