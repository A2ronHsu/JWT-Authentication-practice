import jwt, { SignOptions } from "jsonwebtoken"

export const generateJWT = (payload: any, expiresIn: any) : string => {
   
   const option : SignOptions = {
      expiresIn
   }
   const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
   return token;
}