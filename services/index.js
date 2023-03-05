export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const validateValues = (validationSchema, values) => {
  for (const key in validationSchema) {
    if (!validationSchema[key].allowNull && values[key].length === 0) {
      return validationSchema[key].message;
    }
  }
  return false;
};
