import { NextFunction, Request, Response } from "express";

const PermissionMiddleware = (domain : string, permission: string[]) => {
   return (Req: Request, Res: Response, Next: NextFunction) => {
      console.log('authorization middleware')
      Res.json({test:'test'})
      Next();
   }
}

export default PermissionMiddleware;