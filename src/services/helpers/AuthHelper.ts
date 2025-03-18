import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const generateJWT = (payload: any, expiresIn: any) : string => {
   
   const option : SignOptions = {
      expiresIn
   }
   const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
   return token;
}

export const decodeJWT = (token:string) : any =>{
   const payloadToken = jwt.decode(token);
   return payloadToken;
}

export const verifyJWT =  (jwt_token:string) : boolean =>{
   try{
      const verify = jwt.verify(jwt_token, process.env.JWT_SECRET as string);
      return true;
   } catch (err:any){
      return false;
      
}

}