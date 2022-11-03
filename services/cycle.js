const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 *
 * @param {object} data
 * @returns {object}
 */
const cycle = (data) => JSON.parse(JSON.stringify(data, getCircularReplacer()));
