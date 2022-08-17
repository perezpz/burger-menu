import React, {
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement,
  Children,
} from 'react';
import { baseStyles, animateStyles } from './baseStyles';
import StyleTransition from './styleTransition';
import noop from './utils/noop';
import cls from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import ClosedIcon from './icons/Close';

type MenuProps = {
  isOpen: boolean;
  side?: string | undefined;
  animate?: string;
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

const Menu = (props: MenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuWrap = useRef(null);
  const {
    isOpen,
    width,
    duration,
    customCrossIcon,
    customIcon,
    side,
    animate,
  } = props;

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
    return style(formatWidth);
  }

  function getStyles(el: string) {
    let style = baseStyles[el] ? getStyle(baseStyles[el]) : {};

    style = {
      ...style,
    };
    return style;
  }

  const handleOverlayClick = () => {
    handleClose();
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

  const variants: any = animateStyles[animate][side];

  return (
    <>
      {!props.noOverlay && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`overlay ${props.overlayClassName}`}
              style={getStyles('overlay')}
              onClick={handleOverlayClick}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  opacity: 1,
                },
                closed: {
                  opacity: 0,
                },
              }}
            ></motion.div>
          )}
        </AnimatePresence>
      )}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cls('menu-wrap', props.className)}
            ref={menuWrap}
            style={{ ...getStyles('menuWrap'), ...variants.style }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            initial="end"
            animate="start"
            exit="end"
            variants={{
              start: variants.start,
              end: variants.end,
            }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Menu.defaultProps = {
  width: 300,
  noOverlay: false,
  overlayClassName: '',
  onOpen: noop,
  onClose: noop,
  onClick: noop,
  side: 'right',
  animate: 'slide',
};

export default Menu;
