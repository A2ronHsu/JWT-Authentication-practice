import { User } from "../../models/User";
import { AddInterface } from "../../schemas/AuthSchemas";

export default class InMemoryUserRepository {
   private _users: AddInterface[];

   constructor(){
      this._users = [
         {
            "name": "1",
            "email": "1@email.com",
            "phone": "",
            "password": "$2b$10$b8SoUoCehpJVfzWx0mWiIOivg6N.9k937UssWTUwj97sj8IB1Cw5C"
        },
        {
            "name": "2",
            "email": "2@email.com",
            "password": "$2b$10$3RgEk6ilvukeR/5jXTmZS.ZdAgUjfcuLhbc3Lu1CFMPiSgAD1cpGW",
            "phone": ""
        },
        {
            "name": "3",
            "email": "3@email.com",
            "password": "$2b$10$Qtvk7uFK2pTt2nl57laROucc99cqf364PS92iUxwqt/a4u.f0Nv0m",
            "phone": ""
        }
      ]
   }

   async getByEmail ( email: string): Promise<AddInterface>{
      const user = this._users.filter( user => user.email === email);
      return user[0];
   }

   add (dados: AddInterface){
      this._users.push(dados);
      return `${dados.name} inserido` 

   }

   get(){
      return this._users;
   }
}

