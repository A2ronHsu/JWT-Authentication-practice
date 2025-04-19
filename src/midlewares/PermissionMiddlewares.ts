import { NextFunction, Request, Response } from "express";
import AuthRepository from "../repositories/AuthRepository";
import PermissionRepository from "../repositories/PermissionRepository";
import UserGroupRepository from "../repositories/UserGroupRepository";

const authRepository = new AuthRepository();
const permissionRepository = new PermissionRepository();
const userGroupRepository = new UserGroupRepository();

const PermissionMiddleware = (domain : string, permission: string[]) => {
   return (Req: Request, Res: Response, Next: NextFunction) => {
      const id_user = Req.body.user_id;
      
      const dataUser = authRepository.getById(id_user);
      const dataPermission = permissionRepository.getByUserGroupAndDomain(dataUser?.user_group!, domain);
      

      let isNotInArray : Boolean = false;
      permission.forEach(userPermission =>{
         if(!dataPermission?.permissions.includes(userPermission)) isNotInArray = true;
      });
      if (isNotInArray) Res.json({status:"unauthorized"})
      else Next();
      console.log(permission,dataUser, dataPermission);
   }
}

export default PermissionMiddleware;