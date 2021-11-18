type baseOptions = {
  [key: string]: any;
};

const baseStyles: baseOptions = {
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

  menuWrap(width: string | number, left: boolean) {
    return {
      position: 'fixed',
      right: left ? 'auto' : 0,
      left: left ? 0 : 'auto',
      zIndex: 1100,
      width,
      height: '100%',
      transition: 'all 0.5s ease-in-out',
    };
  },
};

export default baseStyles;
