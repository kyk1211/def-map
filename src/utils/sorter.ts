const sorter = <T>(target: T[], key: keyof T, reverse = false): void => {
  if (reverse) {
    switch (key) {
      case 'regDt':
        target.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
        break;
      default:
        target.sort((a, b) => (Number(a[key]) > Number(b[key]) ? 1 : Number(a[key]) < Number(b[key]) ? -1 : 0));
    }
  } else {
    switch (key) {
      case 'regDt':
        target.sort((a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0));
        break;
      default:
        target.sort((a, b) => (Number(a[key]) > Number(b[key]) ? -1 : Number(a[key]) < Number(b[key]) ? 1 : 0));
    }
  }
};

export default sorter;
