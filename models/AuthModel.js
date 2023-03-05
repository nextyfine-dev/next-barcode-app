import { object, string, ref, mixed } from "yup";

export const loginInitialValues = {
  unameMail: "",
  password: "",
};

export const loginValidationSchema = object().shape({
  unameMail: string().trim().required("Email or username is required!"),
  password: string().required("Password is required!"),
});

export const otpInitialValues = {
  otp: "",
};

export const otpValidationSchema = object().shape({
  otp: string().required("Otp is required!").min(6).max(6),
});

export const signUpInitialValues = {
  fullName: "",
  userRole: "",
  gender: "male",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  ref: "",
};

export const signUpValidationSchema = object().shape({
  fullName: string().required("Full name is required!"),
  userRole: mixed().oneOf(["admin", "employee"]).required(),
  gender: mixed()
    .oneOf(["male", "female", "other"])
    .required("Gender is required!"),
  email: string().email().required("Email is required!"),
  phoneNumber: string().required("Phone number is required!"),
  password: string().required("Password is required!").min(6).max(30),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match!")
    .required("Please confirm the password"),
  ref: string().when("userRole", {
    is: "employee",
    then: string().required("Referral code is required!"),
  }),
});

export const updatePassInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const passValidation = {
  oldPassword: {
    allowNull: false,
    type: "string",
    message: "Enter old password",
  },
  newPassword: {
    allowNull: false,
    type: "string",
    message: "Enter new password",
  },
  confirmPassword: {
    allowNull: false,
    type: "string",
    message: "Please confirm the password",
  },
};
