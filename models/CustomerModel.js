export const initialValues = {
  name: "",
  phoneNumber: "",
  email: "",
  productIds: [],
  address: "",
  details: "",
};

export const validationSchema = {
  name: {
    allowNull: false,
    type: "string",
    message: "Customer name is required!",
  },
  phoneNumber: {
    allowNull: false,
    type: "string",
    message: "Phone number is required!",
  },
  email: {
    allowNull: true,
    type: "string",
    // message: "Email is required!",
  },
  productIds: {
    allowNull: true,
    type: "object",
  },
  address: {
    allowNull: false,
    type: "string",
    message: "Address is required!",
  },
  details: {
    allowNull: true,
    type: "string",
  },
};
