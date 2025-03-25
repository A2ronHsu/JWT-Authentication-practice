import { AuthInterface, AddInterface, RefreshTokenInterface } from "../schemas/AuthSchemas";
import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import bcrypt from 'bcrypt';
import { decodeJWT, generateJWT, verifyJWT } from "./helpers/AuthHelper";
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

   async refresh (dadosValidados:RefreshTokenInterface){
      const verifyToken = verifyJWT(dadosValidados.token);
      const verifyRefreshToken = verifyJWT(dadosValidados.refreshToken);
      if(!verifyToken && !verifyRefreshToken){
         throw new Error("Token and refresh token problem")
      }

      if(!verifyToken && verifyRefreshToken){
         const {name, email, phone, password} = decodeJWT(dadosValidados.refreshToken);
         const payloadJWT = {name, email, phone, password};
         const token = generateJWT(payloadJWT, process.env.EXPIRES_TOKEN_IN);
         const refreshToken = generateJWT(payloadJWT, process.env.EXPIRES_REFRESH_TOKEN_IN);
         return {token, refreshToken};
      }

      return {log:'still logged'};

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