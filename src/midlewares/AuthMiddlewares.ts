import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

export const AuthMiddleware = async (Req: Request, Res: Response, Next: NextFunction) =>{
   const authService = new AuthService();
   const { authorization, refreshToken} = Req.headers;

   if (authorization && refreshToken){
      const tokens = authService.refresh({token: authorization, refreshToken: refreshToken as string})
      console.log(tokens, refreshToken);
   }
}