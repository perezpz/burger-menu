import React, {
  useState,
  cloneElement,
  isValidElement,
  Children,
  ReactNode,
} from 'react';
import noop from './utils/noop';
import { Transition as Motion } from '@douyinfe/semi-animation-react';

type TransitionProps = {
  children: ReactNode;
  didEnter: (value: any) => void;
  didLeave: (value: any) => void;
  onRest: (value?: any) => void;
  from: Record<string, any>;
  enter: Record<string, any>;
  leave: Record<string, any>;
};

function Transition(props: TransitionProps) {
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

  const { from, enter, leave } = props;

  if (lastChildren === null && currentChildren === null) return null;

  if (state === 'enter') {
    children = currentChildren;
  } else if (state === 'leave') {
    children = lastChildren;
  }

  return (
    <Motion
      state={state}
      from={from}
      enter={enter}
      leave={leave}
      onRest={onRest}
    >
      {(interpolatingStyle: any) => {
        if (isValidElement(children)) {
          const result = Children.map(children, (child) => {
            return cloneElement(child, {
              style: { ...child.props.style, ...interpolatingStyle },
            });
          });
          return result[0];
        }
        return null;
      }}
    </Motion>
  );
}

Transition.defaultProps = {
  didEnter: noop,
  didLeave: noop,
  onRest: noop,
  children: null,
};

export default Transition;
