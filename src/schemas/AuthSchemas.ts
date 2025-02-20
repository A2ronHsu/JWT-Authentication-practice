import { object, string } from "yup";

export const executeAuthSchema = object().shape({
   email: string().email().required(),
   password: string().min(8).required()
})