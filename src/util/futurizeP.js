export default Future => fn => function futurizeP(...args) {
  return new Future((rej, res) =>
    void fn(...args).then(res, rej)
  );
};
