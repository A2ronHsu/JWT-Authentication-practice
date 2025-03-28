import Yup, { object, string } from "yup";

export const executeAuthSchema = object().shape({
   email: string().email().required(),
   password: string().min(8).required()
})


export const refreshTokenSchema = object().shape({
   token: string().required(),
   refreshToken: string().required()

})

export type AuthInterface = Yup.InferType<typeof executeAuthSchema>;
export type RefreshTokenInterface = Yup.InferType<typeof refreshTokenSchema>;




export const addAuthSchema = object().shape({
   name: string().required(),
   email: string().email().required(),
   phone: string(),
   password: string().min(8).required()
})

export type AddInterface = Yup.InferType<typeof addAuthSchema>;