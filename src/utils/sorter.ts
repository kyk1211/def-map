const sorter = <T>(target: T[], key: keyof T): void => {
  target.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
};

export default sorter;
