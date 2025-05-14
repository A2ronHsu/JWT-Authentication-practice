# JWT-Authentication-practice
Este é uma prática de autenticação e permissão com express, yup, jwt, bcritp.
Dados são validados usando yup, para então serem comparados com a senha no banco de dados in-memory usando bcrypt. Caso a comparação for verdadeira o geramos um token e um refresh token de acordo com um chave uuid e mandado para o front-end. Essa chave tem um tempo de expiração. O refresh pode ser usado sempre que se navega pelo site para renovar o token e o refresh token.
