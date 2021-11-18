import React from 'react';
import noop from './utils/noop';
import cls from 'classnames';

type Props = {
  text: string;
  icon?: React.ReactNode;
  itemKey: string;
  onClick: (e: any) => void;
  selectedKey?: string;
  level: number;
};

const Item = (props: Props) => {
  const onClick = (e: any) => {
    const info = {
      itemKey: props.itemKey,
      domEvent: e,
      text: props.text,
    };
    props.onClick(info);
  };
  let renderIcon = (icon: React.ReactNode) => {
    if (icon) {
      return <i className="bm-item-icon">{icon}</i>;
    }
    if (props.level > 1) {
      return <i className="bm-item-icon">{icon}</i>;
    }
    return null;
  };

  return (
    <div
      className={cls('bm-item', {
        'bm-item-selected': props.itemKey === props.selectedKey,
      })}
      onClick={onClick}
    >
      {renderIcon(props.icon)}
      <span className="item-text">{props.text}</span>
    </div>
  );
};

Item.defaultProps = {
  onClick: noop,
  icon: null,
  level: 1,
};

export default Item;
