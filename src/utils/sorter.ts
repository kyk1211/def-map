const sorter = <T>(target: T[], key: keyof T): void => {
  if (key === 'regDt') {
    target.sort((a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0));
  } else {
    target.sort((a, b) =>
      Number(a[key]) > Number(b[key])
        ? -1
        : Number(a[key]) < Number(b[key])
        ? 1
        : 0
    );
  }
};

export default sorter;
