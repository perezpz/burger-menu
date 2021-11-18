import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  slide as SlideBurger,
  fallDown as FallDownBurger,
  SubMenu,
  Item,
} from '../src';
import Icon from '../examples/src/icons/Menu';
import noop from '../src/utils/noop';
import { genBeforeEach, genAfterEach, mount } from './utils';

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const animates = { slide: SlideBurger, fallDown: FallDownBurger };

function getMenu({
  menuProps,
  subMenuProps,
  itemProps,
  animate = 'slide',
  children,
}) {
  let props = menuProps ? menuProps : {};
  let subProps = subMenuProps ? subMenuProps : {};
  const Burger = animates[animate];

  return (
    <Burger {...props}>
      {children ? (
        children
      ) : (
        <>
          <Item
            itemKey={'manage'}
            text={'User Management'}
            {...itemProps}
          ></Item>
          <SubMenu title="Union Management" {...subProps}>
            <Item
              itemKey={'union'}
              text={'Union Inquiries'}
              {...itemProps}
            ></Item>
            <Item
              itemKey={'entry'}
              text={'Entry information'}
              {...itemProps}
            ></Item>
          </SubMenu>
        </>
      )}
    </Burger>
  );
}

describe('Menu', () => {
  beforeEach(() => {
    genBeforeEach();
  });

  afterEach(() => {
    genAfterEach();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('test appearance', async () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
    });
    const menu = mount(component);

    // check if has corrent SubMenu
    expect(menu.find('.sub-item').length > 0).toBeTruthy();
    // test SubMenu title
    expect(menu.find('.sub-item .title').text()).toBe('Union Management');
    // check if has correct menu items
    expect(menu.find('.bm-item').length === 1).toBeTruthy();
    // check if has corrent overlay
    expect(menu.find('.overlay').length > 0).toBeTruthy();
  });

  it('test control props', async () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
    });
    const menu = mount(component);

    menu.setProps({ noOverlay: true });
    expect(menu.exists('.overlay')).toEqual(false);
  });

  it('test onClose/onOpen', async () => {
    const spyOnClose = sinon.spy(noop);
    const spyOnOpen = sinon.spy(noop);
    const component = getMenu({
      menuProps: {
        isOpen: false,
        onClose: spyOnClose,
        onOpen: spyOnOpen,
      },
    });
    const menu = mount(component);

    menu.setProps({ isOpen: true });
    act(() => {
      jest.runAllTimers();
      menu.update();
    });

    menu.find('.close').simulate('click');
    expect(spyOnClose.calledOnce).toBe(true);
  });

  it('test width', () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
    });
    const menu = mount(component);
    const dom = menu.find('.menu-wrap').getDOMNode();
    expect(window.getComputedStyle(dom).width).toEqual('300px');
    menu.setProps({ width: 400 });
    expect(window.getComputedStyle(dom).width).toEqual('400px');
    menu.setProps({ width: '100%' });
    expect(window.getComputedStyle(dom).width).toEqual('100%');
  });

  it('test left props', () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
    });
    const menu = mount(component);
    menu.setProps({ left: true });
    const dom = menu.find('.menu-wrap').getDOMNode();
    expect(window.getComputedStyle(dom).left).toEqual('0px');
  });

  it('test icon', () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
        customIcon: <Icon className="custom-icon" />,
        customCrossIcon: <Icon className="close-icon" />,
      },
      subMenuProps: {
        icon: <Icon className="sub-arrow-icon" />,
      },
    });
    const menu = mount(component);
    expect(menu.exists('.custom-icon')).toBe(true);
    expect(menu.exists('.close-icon')).toBe(true);
    expect(menu.exists('.sub-arrow-icon')).toBe(true);
  });

  it('test className', async () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
    });
    const menu = mount(component);
    menu.setProps({
      bodyClassName: 'custorm-body',
      htmlClassName: 'custom-html',
      overlayClassName: 'custom-overlay',
    });
    menu.update();
    expect(menu.exists('.custom-html')).toBeTruthy;
    expect(menu.exists('.custom-body')).toBeTruthy;
    expect(menu.exists('.custom-body')).toBeTruthy;
  });

  it('test fallDown', () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
      animate: 'fallDown',
    });
    const menu = mount(component);
    const dom = menu.find('.menu-wrap').getDOMNode();
    expect(window.getComputedStyle(dom).animationName).toEqual('slideInTop');
  });

  it('test Item component', () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
      },
      itemProps: {
        icon: <Icon />,
      },
    });
    const menu = mount(component);
    expect(menu.exists('.bm-item-icon')).toBe(true);
  });
});
