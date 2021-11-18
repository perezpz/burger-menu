import React, {
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement,
  Children,
} from 'react';
import baseStyles from './baseStyles';
import StyleTransition from './styleTransition';
import Transition from './transition';
import noop from './utils/noop';
import cls from 'classnames';

import ClosedIcon from './icons/Close';

type MenuProps = {
  isOpen: boolean;
  left?: boolean;
  width?: string | number;
  duration?: string;
  customCrossIcon?: React.ReactNode;
  customIcon?: React.ReactNode;
  onOpen: (e?: any) => void;
  onClose: (e?: any) => void;
  bodyClassName?: string;
  htmlClassName?: string;
  noOverlay?: boolean;
  overlayClassName?: string;
  children?: React.ReactNode;
  onClick: (data: {
    itemKey: string;
    domEvent: MouseEvent;
    text: string;
  }) => void;
  selectedKey?: string;
  className?: string;
};

const factory = (styles: Record<string, any>) => {
  const Menu = (props: MenuProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuWrap = useRef(null);
    const { isOpen, left, width, duration, customCrossIcon, customIcon } =
      props;

    useEffect(() => {
      if (isOpen !== undefined) {
        setMenuOpen(isOpen);
      }
    }, [isOpen]);

    const handleClose = () => {
      props.onClose(false);
    };

    function getStyle(style: (...args: any[]) => void) {
      const formatWidth = typeof width !== 'string' ? `${width}px` : width;
      return style(formatWidth, left);
    }

    function getStyles(el: string) {
      let style = baseStyles[el] ? getStyle(baseStyles[el]) : {};

      style = {
        ...style,
      };
      return style;
    }

    const menu = styles.menu;
    const { enterCls, leaveCls } = menu(left);

    const handleOverlayClick = () => {
      setMenuOpen(false);
    };
    const applyWrapStyle = () => {
      const addClass = (el: HTMLElement | null, className: string) => {
        el?.classList[isMenuOpen ? 'add' : 'remove'](className);
      };

      if (props.bodyClassName) {
        addClass(document.querySelector('body'), props.bodyClassName);
      }
      if (props.htmlClassName) {
        addClass(document.querySelector('html'), props.htmlClassName);
      }
    };
    const didEnter = () => {
      applyWrapStyle();
      props.onOpen();
    };

    const didLeave = () => {
      applyWrapStyle();
      props.onClose();
    };

    const restProps = {
      didEnter,
      didLeave,
      duration,
    };

    const closeIcon = customCrossIcon ? (
      customCrossIcon
    ) : (
      <ClosedIcon className="close-icon" />
    );

    const childElem = props.children
      ? Children.map(props.children, (child: any) => {
          return cloneElement(child, {
            onClick: props.onClick,
            selectedKey: props.selectedKey,
            level: 1,
          });
        })
      : null;

    return (
      <>
        {!props.noOverlay && (
          <Transition
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {isMenuOpen ? (
              <div
                className={`overlay ${props.overlayClassName}`}
                style={getStyles('overlay')}
                onClick={handleOverlayClick}
              ></div>
            ) : null}
          </Transition>
        )}
        <StyleTransition {...restProps} enter={enterCls} leave={leaveCls}>
          {isMenuOpen ? (
            <div
              className={cls('menu-wrap', props.className)}
              ref={menuWrap}
              style={getStyles('menuWrap')}
            >
              <div className="head">
                {isValidElement(customIcon) &&
                  cloneElement(customIcon, {
                    className: cls('logo', customIcon.props.className),
                  })}
                <div className="close" onClick={handleClose}>
                  {closeIcon}
                </div>
              </div>
              <div className="menu">{childElem}</div>
            </div>
          ) : null}
        </StyleTransition>
      </>
    );
  };

  Menu.defaultProps = {
    width: 300,
    noOverlay: false,
    overlayClassName: '',
    onOpen: noop,
    onClose: noop,
    left: false,
    onClick: noop,
  };

  return Menu;
};

export default factory;
