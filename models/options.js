export const defaultNavOptions = (headerShown = false, ...props) => {
  return { headerShown, ...props };
};

export const selectOptions = [
  { label: "Active", value: true },
  { label: "Disabled", value: false },
];
