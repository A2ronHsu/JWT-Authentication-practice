import { Permission } from "../models/Permission";

export default class PermissionRepository{
   private permission: Permission[];

   constructor(){
      this.permission = [
         {id: "1", user_group: 1, domain:"project", permissions: ['getAll', 'getById', 'add', 'update', 'delete']},
         {id: "2", user_group: 2, domain:"funcionário", permissions: [ 'getAll','getById', 'add', 'update']}
      ]
   }

   getAll(){
      return this.permission;
   }

   getById(id:string){
      return this.permission.find( permission => id == permission.id);
   }

   getByUserGroupAndDomain (userGroup: number, domain: string){
      return this.permission.find(permission => permission.user_group == userGroup && permission.domain == domain);
   }
};