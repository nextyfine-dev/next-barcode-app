import { object, string, boolean } from "yup";

export const initialValues = {
  adminId: "",
  name: "",
  address: "",
  details: "",
  active: true,
};

export const validationSchema = object({
  adminId: string().optional("Admin is required!"),
  name: string().required("Shop name is required!"),
  address: string().required("Shop address is required!"),
  details: string().optional("Shop details is required!"),
  active: boolean().optional("Shop active is required!"),
});
