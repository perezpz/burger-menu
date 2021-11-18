import React, { useState, ReactNode } from 'react';
import Animation from './styleAnimation';
import noop from './utils/noop';

type StyleTransitionProps = {
  children: ReactNode;
  didEnter: (value: any) => void;
  didLeave: (value: any) => void;
  onRest: (value?: any) => void;
  duration: string;
  enter: string;
  leave: string;
};

function StyleTransition(props: StyleTransitionProps) {
  let { children } = props;

  const [state, setState] = useState('');
  const [lastChildren, setLastChildren] = useState<ReactNode>(null);
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(null);

  if (props.children !== currentChildren) {
    setLastChildren(currentChildren);
    setCurrentChildren(props.children);

    if (props.children === null) {
      setState('leave');
    } else {
      setState('enter');
    }
  }

  const onRest = (currentProps: any) => {
    if (state === 'enter') {
      props.didEnter(currentProps);
    } else if (state === 'leave') {
      setLastChildren(null);
      setCurrentChildren(null);
      props.didLeave(currentProps);
    }
    props.onRest(currentProps);
  };

  const { enter, leave, ...restProps } = props;

  let type: string = '';

  if (lastChildren === null && currentChildren === null) return null;

  if (state === 'enter') {
    type = enter;
    children = currentChildren;
  } else if (state === 'leave') {
    type = leave;
    children = lastChildren;
  }

  return (
    <Animation {...restProps} type={type} onRest={onRest}>
      {children}
    </Animation>
  );
}

StyleTransition.defaultProps = {
  didEnter: noop,
  didLeave: noop,
  onRest: noop,
  duration: '300ms',
  children: null,
};

export default StyleTransition;
