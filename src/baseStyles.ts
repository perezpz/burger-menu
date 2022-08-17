type baseOptions = {
  [key: string]: any;
};

export const baseStyles: baseOptions = {
  overlay() {
    return {
      position: 'fixed',
      zIndex: 1000,
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.3)',
    };
  },

  menuWrap(width: string | number) {
    return {
      position: 'fixed',
      zIndex: 1100,
      width,
      height: '100%',
    };
  },
};

export const animateStyles = {
  slide: {
    right: {
      start: {
        x: '0',
      },
      end: {
        x: '100%',
      },
      style: {
        right: 0,
      },
    },
    left: {
      start: {
        x: '100%',
      },
      end: {
        x: '0',
      },
      style: {
        right: '100%',
      },
    },
  },
  fallDown: {
    left: {
      start: {
        y: '100%',
      },
      end: {
        y: '0',
      },
      style: {
        left: 0,
        top: '-100%',
      },
    },
    right: {
      start: {
        y: '100%',
      },
      end: {
        y: '0',
      },
      style: {
        right: 0,
        top: '-100%',
      },
    },
  },
};
