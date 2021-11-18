import React, { useState, useCallback, Children, cloneElement } from 'react';
import Transition from './transition';
import ArrowDownIcon from './icons/ArrowDown';

type Props = {
  title: string;
  icon?: React.ReactNode;
  children: any;
  level: number;
  selectedKey?: string;
};
const SubMenu = (props: Props) => {
  const { title, icon, children, ...restProps } = props;
  const [state, setState] = useState({
    isVisible: Children.toArray(children).some(
      (child: any) => child.props.itemKey === restProps.selectedKey,
    ),
    maxHeight: 0,
    rotate: 0,
  });

  const measureRef = useCallback(
    (node) => {
      const currHeight = node && node.scrollHeight;
      if (currHeight && state.maxHeight !== currHeight) {
        setState({ ...state, maxHeight: currHeight });
      }
    },
    [state],
  );

  const handleToggle = () => {
    const rotateVal = state.isVisible ? 0 : 180;
    setState({ ...state, isVisible: !state.isVisible, rotate: rotateVal });
  };

  const { maxHeight, isVisible, rotate } = state;

  return (
    <div className="sub-menu-wrap">
      <div className="sub-item" onClick={handleToggle}>
        <span className="title">{title}</span>
        <span className="arrow">
          {icon ? icon : <ArrowDownIcon className="arrow" rotate={rotate} />}
        </span>
      </div>

      <Transition
        from={{ maxHeight: 0 }}
        enter={{ maxHeight }}
        leave={{ maxHeight: 0 }}
      >
        {isVisible ? (
          <div className="sub-menu" ref={measureRef}>
            {Children.map(children, (child) => {
              return cloneElement(child, {
                ...restProps,
                level: restProps.level + 1,
              });
            })}
          </div>
        ) : null}
      </Transition>
    </div>
  );
};

SubMenu.defaultProps = {};

export default SubMenu;
