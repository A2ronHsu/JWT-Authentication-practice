import { Request, Response } from "express";
import { executeAuthSchema, addAuthSchema } from "../schemas/AuthSchemas";
import AuthService from "../services/AuthService";

const authService = new AuthService();

class AuthController {

   async execute(Req:Request, Res:Response){
      try {
         const dadosValidados = await executeAuthSchema.validate(Req.body, {stripUnknown: true});
         const resultadoAutenticacao = await authService.execute(dadosValidados);
         Res.json(resultadoAutenticacao);
      } catch (err:any) {
         Res.status(400).json({error: err.message});
      }
   }

   async refresh(Req:Request, Res:Response){
      try {
         
      } catch (err:any) {
         Res.status(400).json({error: err.message});
      }
   }

   async add(Req: Request, Res: Response){
      try {
         const dadosValidados = await addAuthSchema.validate(Req.body, {stripUnknown: true});
         const resultadoAutenticacao = await authService.add(dadosValidados);
         Res.json({resultadoAutenticacao});
      } catch (err:any) {
         Res.status(400).json({error: err.message});
      }
   }

   get (Req: Request, Res: Response){
      try {
         const result = authService.get();
         Res.json(result);
      } catch (err:any) {
         Res.status(400).json({error: err.message});
      }
   }
}

export default AuthController;