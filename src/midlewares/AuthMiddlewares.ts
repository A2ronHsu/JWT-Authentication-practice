import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

export const AuthMiddleware = async (Req: Request, Res: Response, Next: NextFunction) =>{
   const authService = new AuthService();
   const { authorization, refreshtoken} = Req.headers;
   console.log({authorization : authorization, refreshtoken: refreshtoken});
   try{
      if (authorization && refreshtoken){
         const tokens = await authService.refresh({token: authorization, refreshToken: refreshtoken as string});
         console.log(tokens);
         Res
         .set("authorization", tokens.token)
         .set("refreshtoken", tokens.refreshToken)
         .set("log", tokens.log);
         
         Next();
         return;
      }
      throw new Error("erro de atenticação");
   }catch(err: any){
      console.log("error found");
      Res.json({error:err.message});
   }


}