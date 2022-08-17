import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  children: any;
  isVisible: boolean;
};

const Collapsible = (props: Props) => {
  const { children, isVisible } = props;
  const [height, setHeight] = useState(0);

  const measureRef = useCallback(
    (node) => {
      if (node) {
        const currHeight = node.scrollHeight;
        if (currHeight && height !== currHeight) {
          setHeight(currHeight);
        }
      }
    },
    [height],
  );

  const _ID = useMemo(() => `${Math.random()}:${Date.now()}`, []);

  const content = (
    <motion.div
      className="sub-menu"
      ref={measureRef}
      key={_ID}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      initial="collapsed"
      animate={isVisible ? 'open' : 'collapsed'}
      exit="collapsed"
      variants={{
        open: {
          height: height || 'auto',
          opacity: 1,
          overflow: 'auto',
          transitionEnd: {
            height: 'auto'
          }
        },
        collapsed: {
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        },
      }}
    >
      {children || ''}
    </motion.div>
  );

  return <AnimatePresence>{isVisible && content}</AnimatePresence>;
};

export default Collapsible;
