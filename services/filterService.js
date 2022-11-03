/**
 *
 * @param {object} values
 * @return {object}
 */
export const filterValues = (values) => {
  const newValues = {};
  for (const value in values) {
    if (
      values[value] &&
      (values[value].length > 0 || typeof values[value] === "number")
    ) {
      newValues[value] = values[value];
    }
  }
  return newValues;
};
