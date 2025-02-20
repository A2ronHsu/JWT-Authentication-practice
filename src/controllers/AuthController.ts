import { Request, Response } from "express";
import { executeAuthSchema } from "../schemas/AuthSchemas";
import AuthService from "../services/AuthService";

const authService = new AuthService();

class AuthController {
   async execute(Req:Request, Res:Response){
      try {
         const dadosValidados = await executeAuthSchema.validate(Req.body, {stripUnknown: true});
         const resultadoAutenticacao = await authService.execute(dadosValidados);
         Res.json({resultadoAutenticacao});
      } catch (err:any) {
         Res.status(400).json({error: err.message});
      }
   }

   async refresh(Req:Request, Res:Response){
      Res.json({success:true});
   }
}

export default AuthController;