import { AuthInterface, AddInterface } from "../schemas/AuthSchemas";
import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import bcrypt from 'bcrypt';
import { generateJWT } from "./helpers/AuthHelper";
const inMemoryUserRepository = new InMemoryUserRepository();     

class AuthService {
   
   async execute (dadoValidados:AuthInterface){
      const dataUser = await inMemoryUserRepository.getByEmail(dadoValidados.email);
      const ifPasswordCorrect = await bcrypt.compare(dadoValidados.password, dataUser.password);
      
      
      
      if(!dataUser && !ifPasswordCorrect){
         throw new Error('not valid');
         
      }
      
      const token = generateJWT(dataUser, process.env.EXPIRES_TOKEN_IN);
      const refreshToken = generateJWT(dataUser, process.env.EXPIRES_REFRESH_TOKEN_IN);
      return {token,refreshToken}; 
   }

   async refresh (){

   }

   async add (dadosValidados:AddInterface){
      const senhaCriptografada = await bcrypt.hash(dadosValidados.password,10);
      dadosValidados.password = senhaCriptografada;
      return inMemoryUserRepository.add(dadosValidados);
   }

   get (){
      return inMemoryUserRepository.get()
   }
}

export default AuthService;