import React from 'react';
import { act } from 'react-dom/test-utils';
import { Menu, SubMenu, Item } from '../src';
import Icon from '../examples/src/icons/Menu';
import noop from '../src/utils/noop';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

function getMenu({ menuProps, subMenuProps, itemProps, children }) {
  let props = menuProps ? menuProps : {};
  let subProps = subMenuProps ? subMenuProps : {};

  return (
    <Menu {...props}>
      {children ? (
        children
      ) : (
        <>
          <Item itemKey={'manage'} text={'User Management'} {...itemProps}></Item>
          <SubMenu title="Union Management" {...subProps}>
            <Item itemKey={'union'} text={'Union Inquiries'} {...itemProps}></Item>
            <Item itemKey={'entry'} text={'Entry information'} {...itemProps}></Item>
          </SubMenu>
        </>
      )}
    </Menu>
  );
}

describe('Menu', () => {
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
    const { container } = render(component);

    // test SubMenu title
    expect(screen.getByText('Union Management')).toBeTruthy();
    // check if has correct menu items
    expect(container.querySelectorAll('.bm-item').length === 1).toBeTruthy();
    // // check if has corrent overlay
    expect(container.querySelectorAll('.overlay').length > 0).toBeTruthy();
  });

  it('test control props', async () => {
    let container = render(
      getMenu({
        menuProps: {
          isOpen: true,
        },
      }),
    ).container;
    expect(container.querySelectorAll('.overlay').length).toBe(1);

    container = render(
      getMenu({
        menuProps: {
          isOpen: true,
          noOverlay: true,
        },
      }),
    ).container;
    expect(container.querySelectorAll('.overlay').length).toBe(0);
  });

  it('test onClose/onOpen', async () => {
    const handleClick = jest.fn()
    const component = getMenu({
      menuProps: {
        isOpen: true,
        onClose: handleClick,
        onOpen: handleClick,
      },
    });
    const { container } = render(component);
    fireEvent.click(container.querySelector('.close'));
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(screen.getByText('User Management')).toBeNull;
  });

  it('test width', () => {
    const container1 = render(
      getMenu({
        menuProps: {
          isOpen: true,
        },
      }),
    ).container;
    expect(window.getComputedStyle(container1.querySelector('.menu-wrap')).width).toEqual('300px');

    const container2 = render(
      getMenu({
        menuProps: {
          isOpen: true,
          width: '100%',
        },
      }),
    ).container;
    expect(window.getComputedStyle(container2.querySelector('.menu-wrap')).width).toEqual('100%');
  });

  it('test side props', () => {
    const { container } = render(
      getMenu({
        menuProps: {
          isOpen: true,
          side: 'right',
        },
      }),
    );
    expect(window.getComputedStyle(container.querySelector('.menu-wrap')).right).toEqual('0px');
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
    const { container } = render(component);
    expect(container.getElementsByClassName('custom-icon').length).toBe(1);
    expect(container.getElementsByClassName('close-icon').length).toBe(1);
    expect(container.getElementsByClassName('sub-arrow-icon').length).toBe(1);
  });

  it('test className', async () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
        bodyClassName: 'custom-body',
        htmlClassName: 'custom-html',
        overlayClassName: 'custom-overlay',
      },
    });
    const { container } = render(component);

    await waitFor(() => {
      expect(document.getElementsByClassName('custom-html').length).toBe(1);
      expect(document.getElementsByClassName('custom-body').length).toBe(1);
      expect(container.getElementsByClassName('custom-overlay').length).toBe(1);
    });
  });

  it('test fallDown', async () => {
    const component = getMenu({
      menuProps: {
        isOpen: true,
        animate: 'fallDown',
      },
    });
    const { container } = render(component);
    await waitFor(() => {
      const dom = container.querySelector('.menu-wrap');
      expect(window.getComputedStyle(dom).top).toEqual('-100%');
    });
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
    const { container } = render(component);
    expect(container.querySelectorAll('.bm-item-icon').length).toBe(1);
  });
});
