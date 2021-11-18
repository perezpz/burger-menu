import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import * as JSURL from 'jsurl';
import { useSearchParams } from 'react-router-dom';
import { slide, fallDown, SubMenu, Item } from 'burger-menu';
import 'burger-menu/lib/index.css';
import './index.scss';

import MenuIcon from './icons/Menu';
import LoveIcon from './icons/Love';

function useQueryParam(key) {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(() => JSURL.parse(paramValue), [paramValue]);

  const setValue = useCallback(
    (newValue) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams);
    },
    [key, searchParams, setSearchParams],
  );

  return [value, setValue];
}

export default function App() {
  const [width, setWidth] = useState(300);
  const [side, setSide] = useState('right');
  const [animate, setAnimaate] = useState('slide');
  const [selectedKey, setSelectedKey] = useState('');
  const [nav, setNav] = useQueryParam('nav');

  const components = { slide, fallDown };
  const Burger = components[animate];

  const [isOpen, setIsOpen] = useState(false);

  const updateNav = (value) => {
    setNav(value);
  };
  const handleClick = (data) => {
    setSelectedKey(data.itemKey);
    updateNav(data.itemKey);
  };

  useEffect(() => {
    if (nav) {
      setNav(nav);
      setSelectedKey(nav);
    }
  }, [nav, setNav]);

  const renderHeader = () => {
    const w = isNaN(width) ? width : Number(width);
    return (
      <div className="mHeader">
        <a href="/">
          {/* <img className="logo" src="/assets/common/logo.svg" alt="logo" /> */}
        </a>
        <div className={classnames('burger-wrapper', side)}>
          <div className="burger" onClick={() => setIsOpen(true)}>
            <MenuIcon className="burger" />
          </div>
        </div>
        <Burger
          className="burger-menu"
          width={w}
          left={side === 'left'}
          isOpen={isOpen}
          selectedKey={selectedKey}
          onClose={() => setIsOpen(false)}
          onClick={handleClick}
        >
          <Item
            icon={<LoveIcon />}
            itemKey={'manage'}
            text={'User Management'}
          ></Item>
          <Item itemKey={'user'} text={'User Center'}></Item>
          <SubMenu title="Union Management">
            <Item
              itemKey={'notice'}
              text={'Announcement'}
              icon={<LoveIcon />}
            ></Item>
            <Item itemKey={'union'} text={'Union Inquiries'}></Item>
            <Item itemKey={'entry'} text={'Entry information'}></Item>
          </SubMenu>
        </Burger>
      </div>
    );
  };

  return (
    <>
      <div className="home-page">
        {renderHeader()}
        <div className="homeBanner">
          <div className="section_1">
            <div className="bg">
              <div className="content">
                <div className="side-wrapper">
                  <button
                    className={classnames('button mg', {
                      active: side === 'left',
                    })}
                    onClick={() => setSide('left')}
                  >
                    Left
                  </button>
                  <button
                    className={classnames('button', {
                      active: side === 'right',
                    })}
                    onClick={() => setSide('right')}
                  >
                    Right
                  </button>
                </div>
                <div className="input-wrapper">
                  <div className="prefix">width:</div>
                  <input
                    className="bm-input"
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
                <div className="animate-wrapper">
                  <button
                    className={classnames('button', {
                      active: animate === 'fallDown',
                    })}
                    onClick={() => setAnimaate('fallDown')}
                  >
                    FallDown
                  </button>
                  <button
                    className={classnames('button', {
                      active: animate === 'slide',
                    })}
                    onClick={() => setAnimaate('slide')}
                  >
                    Slide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
