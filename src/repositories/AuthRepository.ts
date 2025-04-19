import { User } from "../models/User";

export default class AuthRepository{
   private _users: User[];

   constructor(){
      this._users = [
         {
            id:"1",
            user_group:1,
            "name": "name1",
            "email": "1@email.com",
            "phone": "",
            "password": "$2b$10$b8SoUoCehpJVfzWx0mWiIOivg6N.9k937UssWTUwj97sj8IB1Cw5C"
        },
        {
            id:"2",
            user_group:2,
            "name": "name2",
            "email": "2@email.com",
            "password": "$2b$10$3RgEk6ilvukeR/5jXTmZS.ZdAgUjfcuLhbc3Lu1CFMPiSgAD1cpGW",
            "phone": ""
        },
        {
            id:"3",
            user_group:1,
            "name": "name3",
            "email": "3@email.com",
            "password": "$2b$10$Qtvk7uFK2pTt2nl57laROucc99cqf364PS92iUxwqt/a4u.f0Nv0m",
            "phone": ""
        }
      ]
   }

   getById (id:string){
      return this._users.find(user => user.id === id);

   }

   async getByEmail ( email: string){
      const user = this._users.find( user => user.email === email);
      return user;
   }
}