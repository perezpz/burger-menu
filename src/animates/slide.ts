const styles = {
  menu(left: boolean) {
    return {
      enterCls: left ? 'slideInLeft' : 'slideInRight',
      leaveCls: left ? 'slideOutLeft' : 'slideOutRight'
    };
  }
};

export default styles;
