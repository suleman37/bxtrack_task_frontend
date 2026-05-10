import * as yup from "yup";

export const customerSchema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().required(),
  assignedTo: yup.string().trim().required(),
});

export type CustomerFormType = yup.InferType<typeof customerSchema>;
