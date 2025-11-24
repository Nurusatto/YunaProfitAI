import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().email("Invalid email").required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
});
