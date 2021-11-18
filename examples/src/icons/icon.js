import React, { createElement } from 'react';
import cls from 'classnames';

function convertIcon(svg) {
  return function (props) {
    const { style, className, rotate, ...restProps } = props;
    const classes = cls('icon icon-default', className);
    const outerStyle = {};

    if (Number.isSafeInteger(rotate)) {
      outerStyle.transform = `rotate(${rotate}deg)`;
    }
    Object.assign(outerStyle, style);
    return (
      <span role="img" className={classes} style={outerStyle} {...restProps}>
        {createElement(svg)}
      </span>
    );
  };
}

export default convertIcon;
