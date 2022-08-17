import React, { useState, Children, cloneElement } from 'react';
import ArrowDownIcon from './icons/ArrowDown';
import Collapsible from './collapsible';

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
    rotate: 0,
  });

  const handleToggle = () => {
    const rotateVal = state.isVisible ? 0 : 180;
    setState({ ...state, isVisible: !state.isVisible, rotate: rotateVal });
  };

  const { isVisible, rotate } = state;

  return (
    <div className="sub-menu-wrap">
      <div className="sub-item" onClick={handleToggle}>
        <span className="title">{title}</span>
        <span className="arrow">
          {icon ? icon : <ArrowDownIcon className="arrow" rotate={rotate} />}
        </span>
      </div>

      <Collapsible isVisible={isVisible}>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            ...restProps,
            level: restProps.level + 1,
          });
        })}
      </Collapsible>
    </div>
  );
};

SubMenu.defaultProps = {};

export default SubMenu;
