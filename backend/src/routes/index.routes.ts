import { Router } from 'express'; //importa o recurso Router do Express.
import { home } from '../controllers/home.controller.js';
import { createMovie } from '../controllers/movie.controller.js';


const router = Router(); // Cria um agrupamento de rotas que será conectado à aplicação.

router.get('/', home); //envia a resposta ao cliente
router.post('/movies', createMovie); 

export default router; //permite utilizar esse agrupamento em outro arquivo.