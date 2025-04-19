import { AuthInterface, AddInterface, RefreshTokenInterface } from "../schemas/AuthSchemas";
import AuthRepository from "../repositories/AuthRepository";
import bcrypt from 'bcrypt';
import { decodeJWT, generateJWT, verifyJWT } from "./helpers/AuthHelper";
const authRepository = new AuthRepository();     

class AuthService {
   
   async execute (dadoValidados:AuthInterface){
      const dataUser = await authRepository.getByEmail(dadoValidados.email);
      if (dataUser?.password){
         const ifPasswordCorrect = await bcrypt.compare(dadoValidados.password, dataUser.password);
      
      
      
      
      if(!dataUser || !ifPasswordCorrect){
         throw new Error('not valid');
         
      }
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
         const {name, email, phone, password, id, user_group} = decodeJWT(dadosValidados.refreshToken);
         const payloadJWT = {name, email, phone, password, id, user_group};
         const token = generateJWT(payloadJWT, process.env.EXPIRES_TOKEN_IN);
         const refreshToken = generateJWT(payloadJWT, process.env.EXPIRES_REFRESH_TOKEN_IN);
         return {token, refreshToken, log:'refreshed'};
      }

      return {token: dadosValidados.token, refreshToken:dadosValidados.refreshToken,log:'still logged'};

   }

   // async add (dadosValidados:AddInterface){
   //    const senhaCriptografada = await bcrypt.hash(dadosValidados.password,10);
   //    dadosValidados.password = senhaCriptografada;
   //    return inMemoryUserRepository.add(dadosValidados);
   // }

   // get (){
   //    return inMemoryUserRepository.get()
   // }
}

export default AuthService;