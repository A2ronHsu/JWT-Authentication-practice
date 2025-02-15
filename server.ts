import express from 'express';
import router from './routes';

const server = express();

console.log('testing server')

server.listen(3000);