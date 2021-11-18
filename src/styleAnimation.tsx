import React, { isValidElement, cloneElement, Children } from 'react';

type StyleAnimationProps = {
  children: React.ReactNode;
  type: string;
  duration: string;
  onRest: (value?: any) => void;
};

function StyleAnimation(props: StyleAnimationProps) {
  let { children, type, duration } = props;
  const animateStyle = {
    animationName: type,
    animationDuration: duration,
  };

  const generateAnimateEvents = () => ({
    onAnimationEnd: () => {
      props.onRest();
    },
  });

  if (isValidElement(children)) {
    children = Children.map(children, (child) => {
      const animateEvents = generateAnimateEvents();
      return cloneElement(child, {
        className: child.props.className,
        style: { ...child.props.style, ...animateStyle },
        ...animateEvents,
      });
    });
  }

  return <>{children}</>;
}

export default StyleAnimation;
