export const initialValues = {
  name: "",
  price: "",
  category: "",
  product_images: [],
  adminId: "",
  description: "",
  discount: "",
  discountPrice: "",
  gst: "",
  details: "",
};

export const validationSchema = {
  name: {
    allowNull: false,
    type: "string",
    message: "Product name is required!",
  },
  price: { allowNull: false, type: "string", message: "Price is required!" },
  category: {
    allowNull: false,
    type: "string",
    message: "Category is required!",
  },
  product_images: {
    allowNull: true,
    type: "object",
  },
  adminId: {
    allowNull: true,
    type: "string",
  },
  description: {
    allowNull: true,
    type: "string",
  },
  discount: {
    allowNull: true,
    type: "string",
  },
  discountPrice: {
    allowNull: true,
    type: "string",
  },
  gst: {
    allowNull: true,
    type: "string",
  },
  details: {
    allowNull: true,
    type: "string",
  },
};
