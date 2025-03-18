import Express, { json, text } from "express";
import dotenv from 'dotenv';
import router from "./routes";


dotenv.config();
const server = Express();

server.use(Express.urlencoded({extended:true}))
server.use(router);
server.use(Express.json());
// server.use(text())
server.listen(process.env.PORT);