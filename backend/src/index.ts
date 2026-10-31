import express from 'express';
import routes from './routes/index.routes.js';

const app = express(); //cria a aplicação Express

app.use(express.json()); //middleware que prepara a aplicação para interpretar requisições com corpo JSON.


const PORT = 3000; //define a porta 3000.

app.use(routes); // conecta o agrupamento de rotas à aplicação Express.

// Inicialização do servidor

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});





