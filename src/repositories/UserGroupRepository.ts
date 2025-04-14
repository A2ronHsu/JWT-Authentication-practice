import { UserGroups } from "../models/UserGroups";
class UserGroupRepository {
   private userGroups : UserGroups[];

   constructor(){
      this.userGroups = [
         {id: 1, name: "Administrador"},
         {id: 2, name: "Funcionário"}
      ]
   }

   getAll(){
      return this.userGroups;
   }

   getById(id:number){
      return this.userGroups.find(userGroup => id == userGroup.id);
   }

}

export default UserGroupRepository;