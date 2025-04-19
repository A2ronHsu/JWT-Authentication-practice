import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { decodeJWT } from "../services/helpers/AuthHelper";

export const AuthMiddleware = async (Req: Request, Res: Response, Next: NextFunction) =>{
   const authService = new AuthService();
   const { authorization, refreshtoken} = Req.headers;
   try{
      if (authorization && refreshtoken){
         const tokens = await authService.refresh({token: authorization, refreshToken: refreshtoken as string});
         const dataUser = decodeJWT(tokens.token);
         Req.body.user_id = dataUser.id;

         Res
         .set("authorization", tokens.token)
         .set("refreshtoken", tokens.refreshToken)
         Next();
         return;
      }
      throw new Error("erro de atenticação");
   }catch(err: any){
      console.log("error found");
      Res.json({error:err.message});
   }
}